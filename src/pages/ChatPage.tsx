
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  RefreshCw, 
  Server, 
  Code, 
  Repeat, 
  ThumbsUp, 
  ThumbsDown,
  AlertTriangle,
  Trash,
  PaperclipIcon,
  HelpCircle,
  Sparkles,
  Download,
  Copy,
  RotateCw,
  Save,
  Lightbulb,
  PlusCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

// Types for our messages
type MessageRole = 'user' | 'assistant' | 'system';
type FailureType = 'infrastructure' | 'code' | 'flaky' | 'unknown';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  failureType?: FailureType;
  confidence?: number;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m the Jenkins AI Detective. I can help diagnose build failures from ci.jenkins.io data. What would you like to know?',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [selectedBuild, setSelectedBuild] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [sessionTitle, setSessionTitle] = useState("New Conversation");
  const [savedPrompts, setSavedPrompts] = useState<string[]>([
    "Why did the Jenkins Core build #5823 fail?",
    "Is the acceptance test harness failure a flaky test?",
    "Tell me about recent infrastructure issues in Plugin BOM",
    "What's the most common failure in the Pipeline plugin?"
  ]);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample repositories and builds for the UI
  const sampleRepos = [
    { id: "jenkins-core", name: "Jenkins Core" },
    { id: "plugin-bom", name: "Jenkins Plugin BOM" },
    { id: "ath", name: "Acceptance Test Harness" },
    { id: "pipeline", name: "Pipeline Plugin" },
    { id: "docker-plugin", name: "Docker Plugin" }
  ];
  
  const sampleBuilds = {
    "jenkins-core": ["#5823", "#5822", "#5821", "#5820", "#5819"],
    "plugin-bom": ["#349", "#348", "#347", "#346"],
    "ath": ["#1293", "#1292", "#1291"],
    "pipeline": ["#782", "#781", "#780"],
    "docker-plugin": ["#455", "#454", "#453"]
  };

  // Sample data for demonstration
  const sampleResponses = [
    {
      triggers: ['jenkins core', 'core build', '5823'],
      response: "After analyzing the Jenkins Core build #5823 failure, I've detected that this is most likely an **infrastructure issue**. The build agent experienced network connectivity problems during the Maven dependency resolution phase. This has happened 12 times in the past month with the same error signature.\n\n**Error log excerpt:**\n```\nFAILED to download org.jenkins-ci.plugins:plugin-util-api:jar:3.0.1\nFAILED to download org.jenkins-ci.plugins:dark-theme:jar:0.1.0\nConnection reset\n```\n\nThis pattern matches previous infrastructure failures where the connection to the Maven repository was interrupted. The build should succeed when retried on a different agent.",
      failureType: 'infrastructure' as FailureType,
      confidence: 0.87
    },
    {
      triggers: ['plugin', 'bom', '349'],
      response: "Looking at the Plugin BOM build #349 failure, this appears to be a **code-related failure**. The tests are failing because of a recent change in the dependency versions that introduced an incompatibility with the JUnit test framework. This is a legitimate issue that needs to be fixed in the code.\n\n**Error log excerpt:**\n```\nTests run: 15, Failures: 3, Errors: 0, Skipped: 0\n[ERROR] Failed to execute goal org.apache.maven.plugins:maven-surefire-plugin:3.0.0:test (default-test) on project plugin-bom: There are test failures.\n[ERROR] Please refer to target/surefire-reports for the individual test results.\n```\n\nThe failing tests are specifically related to the recent upgrade of the JUnit dependencies. Looking at the history, this started failing after PR #62 was merged which updated several core dependencies.",
      failureType: 'code' as FailureType,
      confidence: 0.92
    },
    {
      triggers: ['test harness', 'acceptance test', 'ath', '1293'],
      response: "I've examined the Acceptance Test Harness build #1293 failure and can confirm this is most likely a **flaky test**. The 'testPluginInstallation' test has failed inconsistently in 23% of runs over the past 2 weeks, regardless of code changes. The test sometimes times out waiting for conditions that are dependent on network speed or server load.\n\n**Error log excerpt:**\n```\norg.openqa.selenium.TimeoutException: Expected condition failed: waiting for element to be clickable: By.xpath: //button[@id='install-plugin-submit'] (tried for 60 second(s) with 500 milliseconds interval)\n```\n\nThis exact test has passed on subsequent runs without any code changes. I recommend marking it as @Unstable or implementing more robust wait conditions to handle varying response times.",
      failureType: 'flaky' as FailureType,
      confidence: 0.79
    },
    {
      triggers: ['diagnose', 'why', 'what happened', 'pipeline', '782'],
      response: "After analyzing Pipeline Plugin build #782, I've identified that this is likely an **infrastructure issue** affecting the test environment. The build is failing during the integration tests with connection timeouts when attempting to connect to the Docker daemon.\n\n**Error log excerpt:**\n```\njava.io.IOException: Failed to connect to docker daemon at tcp://localhost:2375. Connection refused.\n```\n\nThis issue appears to be specific to the ci.jenkins.io agent that ran this build. Looking at the historical data, builds that ran on agent 'linux-amd64-c5' have experienced similar Docker connectivity issues 7 times in the past month. This is not related to any code changes in the Pipeline plugin itself.",
      failureType: 'infrastructure' as FailureType,
      confidence: 0.85
    },
    {
      triggers: ['docker', 'docker-plugin', '455'],
      response: "I've analyzed Docker Plugin build #455, and this is a clear **code issue** resulting from a recent change. The failure is occurring because the plugin is trying to use a new Docker API endpoint that was introduced in a newer version, but the compatibility check is incorrect.\n\n**Error log excerpt:**\n```\njava.lang.NoSuchMethodError: 'boolean com.github.dockerjava.api.DockerClient.pingCmd()'\n```\n\nThis error started appearing after commit 7a2b3c4 which was intended to add support for Docker API v1.41, but the implementation is attempting to use methods that don't exist in the minimum supported Docker version. The fix would be to add proper version checking before calling these new API methods.",
      failureType: 'code' as FailureType,
      confidence: 0.95
    },
    {
      triggers: ['insights', 'patterns', 'frequency', 'statistics'],
      response: "Based on analysis of ci.jenkins.io data from the past 3 months, here are the key insights about Jenkins build failures:\n\n**Overall Statistics:**\n- Total builds analyzed: 15,743\n- Failed builds: 2,217 (14.1%)\n- Infrastructure issues: 42% of failures\n- Code issues: 27% of failures\n- Flaky tests: 31% of failures\n\n**Common Patterns:**\n\n1. **Network-related infrastructure issues** are the most frequent cause of build failures (18% of all failures). These typically manifest as connection timeouts during dependency resolution.\n\n2. **Memory-related failures** account for 13% of infrastructure issues, with OutOfMemoryErrors occurring most frequently in test stages.\n\n3. **The most flaky tests** are in the Acceptance Test Harness, particularly those involving UI interactions with timeouts.\n\n4. **Most code failures** occur immediately after merges to main branches, indicating potential integration issues.\n\n5. There's a **strong correlation** between build time and failure probability - builds taking >45 minutes have a 23% higher chance of failing.",
      failureType: 'unknown' as FailureType,
      confidence: 0.89
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const response = generateResponse(inputValue);
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
      
      // Update session title if it's a new conversation
      if (messages.length === 1 && sessionTitle === "New Conversation") {
        setSessionTitle(inputValue.slice(0, 25) + (inputValue.length > 25 ? "..." : ""));
      }
    }, 1500);
  };

  const generateResponse = (query: string): Message => {
    // Look for matches in our sample responses
    const lowerQuery = query.toLowerCase();
    
    for (const sample of sampleResponses) {
      if (sample.triggers.some(trigger => lowerQuery.includes(trigger))) {
        return {
          id: Date.now().toString(),
          role: 'assistant',
          content: sample.response,
          timestamp: new Date(),
          failureType: sample.failureType,
          confidence: sample.confidence
        };
      }
    }
    
    // Default response if no matches
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: "I don't have specific information about that particular issue. In a production version, I would be trained on the complete ci.jenkins.io dataset to provide accurate answers. Could you try asking about Jenkins Core build #5823, Plugin BOM build #349, or Acceptance Test Harness build #1293?",
      timestamp: new Date(),
      failureType: 'unknown',
      confidence: 0.3
    };
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m the Jenkins AI Detective. I can help diagnose build failures from ci.jenkins.io data. What would you like to know?',
        timestamp: new Date(),
      }
    ]);
    setSessionTitle("New Conversation");
    
    toast({
      title: "Chat cleared",
      description: "All previous messages have been removed.",
    });
  };

  const giveFeedback = (positive: boolean) => {
    toast({
      title: positive ? "Positive feedback submitted" : "Negative feedback submitted",
      description: "Thank you for your feedback! This helps improve the model.",
    });
  };

  const savePrompt = (prompt: string) => {
    if (!savedPrompts.includes(prompt)) {
      setSavedPrompts(prev => [...prev, prompt]);
      toast({
        title: "Prompt saved",
        description: "The prompt has been added to your saved list.",
      });
    } else {
      toast({
        title: "Already saved",
        description: "This prompt is already in your saved list.",
      });
    }
  };

  const usePrompt = (prompt: string) => {
    setInputValue(prompt);
    setActiveTab('chat');
  };

  const selectBuildForAnalysis = () => {
    if (selectedRepo && selectedBuild) {
      let repoName = sampleRepos.find(r => r.id === selectedRepo)?.name || selectedRepo;
      const message = `Analyze the failure in ${repoName} build ${selectedBuild}`;
      setInputValue(message);
      setActiveTab('chat');
      
      toast({
        title: "Build selected",
        description: `Ready to analyze ${repoName} ${selectedBuild}`,
      });
    } else {
      toast({
        title: "Selection incomplete",
        description: "Please select both a repository and a build number.",
        variant: "destructive"
      });
    }
  };

  const getFailureIcon = (type?: FailureType) => {
    switch(type) {
      case 'infrastructure':
        return <Server className="h-5 w-5 text-jenkins-blue" />;
      case 'code':
        return <Code className="h-5 w-5 text-jenkins-green" />;
      case 'flaky':
        return <Repeat className="h-5 w-5 text-jenkins-yellow" />;
      default:
        return null;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "The message has been copied to your clipboard.",
      });
    });
  };

  const downloadChat = () => {
    const chatText = messages.map(m => 
      `[${m.timestamp.toLocaleString()}] ${m.role === 'user' ? 'You' : 'Jenkins AI'}: ${m.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sessionTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-chat.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Chat downloaded",
      description: "Your conversation has been saved as a text file.",
    });
  };

  const saveSession = () => {
    toast({
      title: "Session saved",
      description: "Your conversation has been saved.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 w-full">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Jenkins AI Detective</CardTitle>
              <CardDescription>Analysis and diagnostics</CardDescription>
            </CardHeader>
            <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="builds">Builds</TabsTrigger>
                <TabsTrigger value="prompts">Prompts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="min-h-[300px]">
                <CardContent className="space-y-4 mt-2">
                  <div className="space-y-1">
                    <Label>Session</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        value={sessionTitle} 
                        onChange={(e) => setSessionTitle(e.target.value)}
                        className="h-8 text-sm"
                      />
                      <Button size="sm" variant="ghost" onClick={saveSession} title="Save session">
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Tools</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" onClick={clearChat}>
                        <Trash className="h-3.5 w-3.5 mr-1" /> Clear
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadChat}>
                        <Download className="h-3.5 w-3.5 mr-1" /> Export
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <PaperclipIcon className="h-3.5 w-3.5 mr-1" /> Attach
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Attach Build Log</DialogTitle>
                            <DialogDescription>
                              Upload a build log file for AI analysis
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="border-2 border-dashed rounded-lg p-6 text-center">
                              <PaperclipIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm mb-2">Drag & drop a log file or click to browse</p>
                              <Button size="sm">Select File</Button>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => {
                              toast({
                                title: "Feature coming soon",
                                description: "File upload functionality will be available in the next update.",
                              });
                            }}>Upload and Analyze</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <HelpCircle className="h-3.5 w-3.5 mr-1" /> Help
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>AI Assistant Help</DialogTitle>
                            <DialogDescription>
                              Tips for using the Jenkins AI Detective
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <h4 className="font-medium">Sample Questions</h4>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                              <li>Why did the Jenkins Core build #5823 fail?</li>
                              <li>Is this a flaky test in the ATH build #1293?</li>
                              <li>What's causing infrastructure failures this month?</li>
                              <li>Show me insights about failure patterns</li>
                            </ul>
                            <p className="text-sm text-muted-foreground mt-4">
                              In this demo, the AI responds to questions about specific builds:
                              Jenkins Core #5823, Plugin BOM #349, ATH #1293, Pipeline #782, and Docker Plugin #455.
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="builds" className="min-h-[300px]">
                <CardContent className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="repository">Repository</Label>
                    <Select value={selectedRepo || ""} onValueChange={setSelectedRepo}>
                      <SelectTrigger id="repository">
                        <SelectValue placeholder="Select repository" />
                      </SelectTrigger>
                      <SelectContent>
                        {sampleRepos.map(repo => (
                          <SelectItem key={repo.id} value={repo.id}>{repo.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="build">Build Number</Label>
                    <Select 
                      value={selectedBuild || ""} 
                      onValueChange={setSelectedBuild}
                      disabled={!selectedRepo}
                    >
                      <SelectTrigger id="build">
                        <SelectValue placeholder="Select build" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedRepo && 
                          sampleBuilds[selectedRepo as keyof typeof sampleBuilds]?.map(build => (
                            <SelectItem key={build} value={build}>{build}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    disabled={!selectedRepo || !selectedBuild}
                    onClick={selectBuildForAnalysis}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze Build
                  </Button>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recent Builds</h4>
                    <div className="space-y-2">
                      {sampleRepos.slice(0, 3).map(repo => (
                        sampleBuilds[repo.id as keyof typeof sampleBuilds]?.slice(0, 1).map(build => (
                          <Button 
                            key={`${repo.id}-${build}`}
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start text-left"
                            onClick={() => {
                              setSelectedRepo(repo.id);
                              setSelectedBuild(build);
                              selectBuildForAnalysis();
                            }}
                          >
                            <div className="truncate">
                              {repo.name} {build}
                            </div>
                          </Button>
                        ))
                      ))}
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="prompts" className="min-h-[300px]">
                <CardContent className="p-3">
                  <ScrollArea className="h-[400px] rounded-md border p-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">Suggested Prompts</h4>
                      <div className="space-y-2">
                        {savedPrompts.map((prompt, index) => (
                          <div key={index} className="flex items-start gap-2 group">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-auto py-2 px-3 w-full justify-start text-left" 
                              onClick={() => usePrompt(prompt)}
                            >
                              <Lightbulb className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
                              <span className="text-sm truncate">{prompt}</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <h4 className="font-medium pt-2">Add New Prompt</h4>
                      <div className="space-y-2">
                        <Textarea 
                          placeholder="Enter a prompt to save for later use..." 
                          className="h-20 resize-none"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          className="w-full"
                          disabled={!inputValue.trim()}
                          onClick={() => {
                            if (inputValue.trim()) {
                              savePrompt(inputValue.trim());
                              setInputValue('');
                            }
                          }}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Save Prompt
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1">
          <Card className="min-h-[70vh] flex flex-col">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div>
                  <CardTitle>AI Chat Analysis</CardTitle>
                  <CardDescription>
                    Ask questions about Jenkins build failures and get intelligent diagnoses
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={downloadChat}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Chat
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearChat}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    New Chat
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-y-auto px-4 md:px-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] md:max-w-[75%] rounded-lg p-4 ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      {message.failureType && (
                        <div className="flex items-center gap-2 mb-2">
                          {getFailureIcon(message.failureType)}
                          <span className="text-xs font-medium">
                            {message.failureType === 'infrastructure' && 'Infrastructure Issue'}
                            {message.failureType === 'code' && 'Code Issue'}
                            {message.failureType === 'flaky' && 'Flaky Test'}
                            {message.failureType === 'unknown' && 'Analysis'}
                            {message.confidence && ` (${Math.round(message.confidence * 100)}% confidence)`}
                          </span>
                        </div>
                      )}
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {message.content.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="text-xs opacity-70 mt-2 flex justify-between items-center">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.role === 'assistant' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 -mr-2"
                            onClick={() => copyToClipboard(message.content)}
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                      
                      {message.role === 'assistant' && message.failureType && (
                        <div className="mt-3 flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2"
                            onClick={() => giveFeedback(true)}
                          >
                            <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">Helpful</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2"
                            onClick={() => giveFeedback(false)}
                          >
                            <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">Not helpful</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2"
                            onClick={() => savePrompt(message.content)}
                          >
                            <Save className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">Save</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] md:max-w-[75%] rounded-lg p-4 bg-muted">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Analyzing Jenkins data...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={endOfMessagesRef} />
              </div>
            </CardContent>
            
            <Separator />
            
            <CardFooter className="pt-4">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                  placeholder="Ask about a Jenkins build failure..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  className="flex-grow"
                />
                <Button 
                  type="submit" 
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </CardFooter>
          </Card>
          
          <div className="mt-6">
            <Card className="bg-muted/50">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-jenkins-yellow" />
                  <CardTitle className="text-base">POC Limitations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is a proof of concept with simulated responses. In the actual implementation, the AI will be fine-tuned with 
                  data from ci.jenkins.io and will provide accurate, data-driven diagnostics for Jenkins build failures.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
