
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RotateCcw, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const JavaCompiler = () => {
  const { toast } = useToast();
  const [code, setCode] = useState(`public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`);
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');

  const compileAndRun = () => {
    setIsCompiling(true);
    setOutput('');
    
    // Simulate compilation delay
    setTimeout(() => {
      // Mock compilation and execution
      if (code.includes('System.out.println')) {
        const printContent = code.match(/System\.out\.println\("(.*)"\)/);
        if (printContent && printContent[1]) {
          setOutput(`Compiling...\nBuilding class files...\nRunning program...\n\n${printContent[1]}\n\nProgram executed successfully.`);
        } else {
          setOutput(`Compiling...\nBuilding class files...\nRunning program...\n\nHello, World!\n\nProgram executed successfully.`);
        }
      } else if (code.trim() === '') {
        setOutput('Error: No code to compile.');
      } else {
        setOutput('Error: Compilation failed. Please check your code syntax.');
      }
      
      setIsCompiling(false);
      setActiveTab('output');
      
      toast({
        title: "Compilation Complete",
        description: "Your Java code has been compiled and executed.",
      });
    }, 1500);
  };

  const resetCode = () => {
    setCode(`public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`);
    setOutput('');
    toast({
      title: "Code Reset",
      description: "Code has been reset to the default example.",
    });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "Code has been copied to clipboard.",
    });
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'HelloWorld.java';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Code Downloaded",
      description: "Your Java code has been downloaded as a .java file.",
    });
  };

  return (
    <PageLayout
      title="Java Compiler"
      description="Compile and run Java code directly in your browser."
    >
      <div className="grid gap-6">
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Java Code Editor</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={resetCode}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button variant="outline" size="sm" onClick={copyCode}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={downloadCode}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <CardDescription>
              Write and execute Java code in this editor. The output will be displayed below.
            </CardDescription>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mx-6">
              <TabsTrigger value="editor">Code Editor</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="mt-0">
              <CardContent className="pt-4">
                <Textarea
                  className="min-h-[400px] font-mono text-sm resize-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your Java code here..."
                />
              </CardContent>
            </TabsContent>
            
            <TabsContent value="output" className="mt-0">
              <CardContent className="pt-4">
                <div className="min-h-[400px] font-mono text-sm bg-muted p-4 rounded-md whitespace-pre-wrap">
                  {output || "Run your code to see output here."}
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>

          <CardFooter className="flex justify-end border-t p-4">
            <Button 
              onClick={compileAndRun} 
              disabled={isCompiling}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              {isCompiling ? "Compiling..." : "Compile & Run"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Java Quick Reference</CardTitle>
            <CardDescription>
              Common Java syntax and examples to help you get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Basic Syntax</h3>
                <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
{`// Class declaration
public class MyClass {
  // Main method
  public static void main(String[] args) {
    // Code goes here
  }
}`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Variables and Data Types</h3>
                <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
{`int number = 10;
double decimal = 10.5;
boolean flag = true;
String text = "Hello";
char letter = 'A';`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Conditional Statements</h3>
                <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
{`if (condition) {
  // code
} else if (anotherCondition) {
  // code
} else {
  // code
}`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Loops</h3>
                <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
{`// For loop
for (int i = 0; i < 10; i++) {
  System.out.println(i);
}

// While loop
while (condition) {
  // code
}

// Do-while loop
do {
  // code
} while (condition);`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default JavaCompiler;
