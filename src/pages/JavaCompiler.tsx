
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Play, Save, Download, Upload, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample starter code templates
const templates = {
  basic: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  loops: `public class Main {
    public static void main(String[] args) {
        // For loop example
        System.out.println("Counting from 1 to 5:");
        for (int i = 1; i <= 5; i++) {
            System.out.println(i);
        }
        
        // While loop example
        System.out.println("\\nEven numbers from 2 to 10:");
        int j = 2;
        while (j <= 10) {
            System.out.println(j);
            j += 2;
        }
    }
}`,
  collections: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        // ArrayList example
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        
        System.out.println("Fruits list:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
        
        // HashMap example
        Map<String, Integer> prices = new HashMap<>();
        prices.put("Apple", 1);
        prices.put("Banana", 2);
        prices.put("Orange", 3);
        
        System.out.println("\\nFruit prices:");
        for (Map.Entry<String, Integer> entry : prices.entrySet()) {
            System.out.println(entry.getKey() + ": $" + entry.getValue());
        }
    }
}`
};

const JavaCompiler = () => {
  const { toast } = useToast();
  const [code, setCode] = useState(templates.basic);
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [tab, setTab] = useState('editor');
  
  const compileAndRun = () => {
    setIsCompiling(true);
    setOutput('Compiling and running your code...');
    
    // Simulate compilation and execution with a delay
    setTimeout(() => {
      if (code.includes('System.out.println')) {
        // Extract the output from the System.out.println statements
        let outputText = '';
        const regex = /System\.out\.println\("([^"]*)"\)/g;
        const matches = code.match(regex);
        
        if (matches) {
          outputText = matches.map(match => {
            const content = match.match(/\("([^"]*)"\)/);
            return content ? content[1] : '';
          }).join('\n');
        } else {
          // More sophisticated simulation for different code patterns
          if (code.includes('Hello, World!')) {
            outputText = 'Hello, World!';
          } else if (code.includes('for (int i = 1; i <= 5; i++)')) {
            outputText = 'Counting from 1 to 5:\n1\n2\n3\n4\n5\n\nEven numbers from 2 to 10:\n2\n4\n6\n8\n10';
          } else if (code.includes('ArrayList') && code.includes('HashMap')) {
            outputText = 'Fruits list:\nApple\nBanana\nOrange\n\nFruit prices:\nApple: $1\nBanana: $2\nOrange: $3';
          } else {
            outputText = 'Program executed successfully. No output to display.';
          }
        }
        
        setOutput(outputText);
        toast({
          title: 'Code Executed Successfully',
          description: 'Your Java code has been compiled and run.',
          variant: 'default',
        });
      } else if (code.trim() === '') {
        setOutput('Error: Empty code cannot be executed.');
        toast({
          title: 'Compilation Error',
          description: 'Empty code cannot be executed.',
          variant: 'destructive',
        });
      } else {
        // Simulate compilation errors for educational purposes
        if (!code.includes('public static void main')) {
          setOutput('Error: Main method not found in class. Please define the main method as:\npublic static void main(String[] args)');
        } else if (code.includes('{') && !code.includes('}')) {
          setOutput('Error: Missing closing brace "}"');
        } else if (!code.includes(';')) {
          setOutput('Error: Missing semicolon ";"');
        } else {
          setOutput('Undefined compilation error. Please check your code syntax.');
        }
        
        toast({
          title: 'Compilation Error',
          description: 'There were errors in your code. Check the output panel for details.',
          variant: 'destructive',
        });
      }
      
      setIsCompiling(false);
    }, 1500);
  };
  
  const loadTemplate = (template: keyof typeof templates) => {
    setCode(templates[template]);
    toast({
      title: 'Template Loaded',
      description: `The ${template} template has been loaded into the editor.`,
    });
  };
  
  const clearCode = () => {
    setCode('');
    setOutput('');
    toast({
      title: 'Editor Cleared',
      description: 'The code editor has been cleared.',
    });
  };
  
  const saveCode = () => {
    // In a real app, this would save to a database
    localStorage.setItem('savedJavaCode', code);
    toast({
      title: 'Code Saved',
      description: 'Your code has been saved successfully.',
    });
  };
  
  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'Main.java';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: 'Code Downloaded',
      description: 'Your Java code has been downloaded as Main.java',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto py-8 px-4">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Java Compiler</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Java Online Compiler</h1>
            <p className="text-muted-foreground">
              Write, compile, and run Java code directly in your browser.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
            <Button variant="outline" size="sm" onClick={() => loadTemplate('basic')}>
              Basic
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadTemplate('loops')}>
              Loops
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadTemplate('collections')}>
              Collections
            </Button>
          </div>
        </div>
        
        <Alert className="mb-6">
          <AlertTitle>Online Java Compiler</AlertTitle>
          <AlertDescription>
            This is a simulated Java compiler for educational purposes. In a production environment, 
            this would connect to a backend service that compiles and executes Java code.
          </AlertDescription>
        </Alert>
        
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Code Editor</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={clearCode}>
                  <RefreshCw className="h-4 w-4 mr-1" /> Clear
                </Button>
                <Button variant="ghost" size="sm" onClick={saveCode}>
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
                <Button variant="ghost" size="sm" onClick={downloadCode}>
                  <Download className="h-4 w-4 mr-1" /> Download
                </Button>
              </div>
            </div>
            
            <div className="relative h-[60vh] border rounded-md">
              <textarea
                className="w-full h-full p-4 font-mono text-sm resize-none bg-card focus:outline-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
              />
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button onClick={compileAndRun} disabled={isCompiling}>
                <Play className="h-4 w-4 mr-2" />
                {isCompiling ? 'Running...' : 'Run Code'}
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-2 flex flex-col">
            <Tabs defaultValue="console" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="console">Console Output</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="console" className="mt-0">
                <div className="min-h-[60vh] bg-card border rounded-md p-4 font-mono text-sm whitespace-pre-wrap overflow-auto">
                  {output || 'Run your code to see output here...'}
                </div>
              </TabsContent>
              
              <TabsContent value="instructions" className="mt-0">
                <div className="min-h-[60vh] bg-card border rounded-md p-4 overflow-auto">
                  <h3 className="font-semibold text-lg mb-2">Java Compiler Instructions</h3>
                  <p className="mb-4">This online compiler allows you to write and execute Java code directly in your browser.</p>
                  
                  <h4 className="font-semibold mb-1">Getting Started:</h4>
                  <ol className="list-decimal list-inside mb-4 space-y-1">
                    <li>Write your Java code in the editor</li>
                    <li>Click the "Run Code" button to compile and execute</li>
                    <li>View the output in the console panel</li>
                  </ol>
                  
                  <h4 className="font-semibold mb-1">Tips:</h4>
                  <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>Your code must include a <code className="bg-muted px-1 rounded">public class Main</code> with a <code className="bg-muted px-1 rounded">main</code> method</li>
                    <li>Use <code className="bg-muted px-1 rounded">System.out.println()</code> to output text to the console</li>
                    <li>The compiler supports Java 11 features</li>
                    <li>External libraries are not supported in this environment</li>
                  </ul>
                  
                  <Separator className="my-4" />
                  
                  <h4 className="font-semibold mb-2">Example Code:</h4>
                  <pre className="bg-muted p-3 rounded-md mb-4 overflow-x-auto">
{`public class Main {
    public static void main(String[] args) {
        // Your code here
        System.out.println("Hello, Java!");
    }
}`}
                  </pre>
                  
                  <p className="text-muted-foreground">
                    For more Java resources and tutorials, visit the Learning Resources section in your dashboard.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaCompiler;
