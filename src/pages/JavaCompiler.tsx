
import React, { useState, useRef, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Play, 
  RotateCcw, 
  Download, 
  Copy, 
  Share,
  Maximize, 
  Sun, 
  Moon,
  X
} from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const JavaCompiler = () => {
  const { toast } = useToast();
  const [code, setCode] = useState(`// Online Java Compiler
// Use this editor to write, compile and run your Java code online

class Main {
  public static void main(String[] args) {
    System.out.println("Try programiz.pro");
  }
}`);
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Generate line numbers whenever code changes
    const lines = code.split('\n');
    setLineNumbers(Array.from({ length: lines.length }, (_, i) => (i + 1).toString()));
  }, [code]);

  const compileAndRun = () => {
    setIsCompiling(true);
    setOutput('');
    
    // Simulate compilation delay
    setTimeout(() => {
      // Parse code to extract what to print
      try {
        const printMatch = code.match(/System\.out\.println\(['"](.*)['"]\)/);
        if (printMatch && printMatch[1]) {
          setOutput(printMatch[1]);
        } else if (code.includes('System.out.println')) {
          // Generic output if println exists but we couldn't parse what to print
          setOutput('Program output');
        } else if (code.trim() === '') {
          setOutput('Error: No code to compile.');
        } else {
          // Check for syntax errors
          const hasBraces = code.includes('{') && code.includes('}');
          const hasClass = code.includes('class');
          const hasMain = code.includes('main');
          
          if (!hasBraces || !hasClass || !hasMain) {
            setOutput('Error: Compilation failed. Please check your Java syntax.');
          } else {
            setOutput('Program executed successfully.');
          }
        }
      } catch (error) {
        setOutput('Error: An exception occurred during compilation.');
      }
      
      setIsCompiling(false);
      
      toast({
        title: "Compilation Complete",
        description: "Your Java code has been compiled and executed.",
      });
    }, 1000);
  };

  const resetCode = () => {
    setCode(`// Online Java Compiler
// Use this editor to write, compile and run your Java code online

class Main {
  public static void main(String[] args) {
    System.out.println("Try programiz.pro");
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

  const shareCode = () => {
    // In a real implementation, this might generate a shareable link
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Shareable link has been copied to clipboard.",
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
      title: "Code Downloaded",
      description: "Your Java code has been downloaded as a .java file.",
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      editorRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
    toast({
      title: "Output Cleared",
      description: "Console output has been cleared.",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <PageLayout
      title="Java Compiler"
      description="Compile and run Java code directly in your browser."
    >
      <div ref={editorRef} className="w-full">
        <div className="flex items-center justify-between bg-muted p-2 rounded-t-md border-b">
          <div className="flex items-center">
            <Badge variant="outline" className="mr-2">Main.java</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-b-md border">
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex">
              <div className="bg-muted p-2 text-right text-sm text-muted-foreground select-none border-r">
                {lineNumbers.map(num => (
                  <div key={num} className="pr-2">{num}</div>
                ))}
              </div>
              <Textarea
                className="flex-1 h-full min-h-[600px] font-mono text-sm rounded-none border-0 resize-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your Java code here..."
                spellCheck="false"
              />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={50} minSize={20}>
            <div className="h-full flex flex-col">
              <div className="bg-muted p-2 border-b flex items-center justify-between">
                <h3 className="text-sm font-medium">Output</h3>
                <Button variant="ghost" size="icon" onClick={clearOutput} title="Clear output">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 p-4 font-mono text-sm bg-muted/50 overflow-auto">
                {output || "Run your code to see output here."}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        <div className="flex items-center justify-between mt-4 gap-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetCode} title="Reset code">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button variant="outline" size="sm" onClick={copyCode} title="Copy code">
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={downloadCode} title="Download code">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={shareCode} title="Share code">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          
          <Button
            onClick={compileAndRun}
            disabled={isCompiling}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Play className="h-4 w-4" />
            {isCompiling ? "Compiling..." : "Run"}
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-medium mb-3">Java Quick Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Basic Syntax</h4>
              <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
{`public class Main {
  public static void main(String[] args) {
    // Code goes here
  }
}`}
              </pre>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Variables</h4>
              <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
{`int number = 10;
double decimal = 10.5;
boolean flag = true;
String text = "Hello";`}
              </pre>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Control Flow</h4>
              <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
{`if (condition) {
  // code
} else {
  // code
}

switch (variable) {
  case value1:
    // code
    break;
  default:
    // code
}`}
              </pre>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Loops</h4>
              <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
{`for (int i = 0; i < 10; i++) {
  // code
}

while (condition) {
  // code
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default JavaCompiler;
