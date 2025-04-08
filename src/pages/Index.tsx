
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, 
  MessageSquare, 
  AlertCircle, 
  Server, 
  Code, 
  Repeat, 
  ArrowRight,
  GitPullRequest,
  DatabaseZap,
  Blocks,
  BarChart2,
  Zap,
  LayoutDashboard,
  LineChart,
  RefreshCw,
  Calendar,
  Download,
  PlusCircle,
  Info
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimeRange, setSelectedTimeRange] = useState("month");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample data
  const recentFailures = [
    { id: 1, repo: "Jenkins Core", build: "#5823", type: "Infrastructure", time: "2h ago", job: "jenkins_main_trunk", status: "Diagnosed" },
    { id: 2, repo: "Jenkins Plugin BOM", build: "#349", type: "Code", time: "5h ago", job: "plugin-compat-tester", status: "Investigating" },
    { id: 3, repo: "Acceptance Test Harness", build: "#1293", type: "Flaky Test", time: "Yesterday", job: "ATH-stable", status: "Fixed" },
    { id: 4, repo: "Pipeline Plugin", build: "#782", type: "Infrastructure", time: "2 days ago", job: "pipeline-stage-tags", status: "Reopened" },
    { id: 5, repo: "Docker Plugin", build: "#455", type: "Code", time: "3 days ago", job: "docker-plugin-master", status: "Fixed" }
  ];
  
  const repositories = [
    { 
      id: 1, 
      name: "Jenkins Core", 
      description: "The Jenkins Continuous Integration and Delivery server",
      failureRate: 12,
      infraIssues: 5,
      codeIssues: 3,
      flakyTests: 4,
      buildCount: 342,
      lastBuild: "2h ago",
      trend: "improving"
    },
    { 
      id: 2, 
      name: "Jenkins Plugin BOM", 
      description: "Bill of Materials for Jenkins plugins",
      failureRate: 8,
      infraIssues: 2,
      codeIssues: 4,
      flakyTests: 2,
      buildCount: 183,
      lastBuild: "4h ago",
      trend: "stable"
    },
    { 
      id: 3, 
      name: "Acceptance Test Harness", 
      description: "Framework for testing Jenkins and plugins",
      failureRate: 15,
      infraIssues: 6,
      codeIssues: 3,
      flakyTests: 6,
      buildCount: 267,
      lastBuild: "Yesterday",
      trend: "declining"
    },
    { 
      id: 4, 
      name: "Pipeline Plugin", 
      description: "Jenkins Pipeline implementation",
      failureRate: 9,
      infraIssues: 3,
      codeIssues: 4,
      flakyTests: 2,
      buildCount: 215,
      lastBuild: "3h ago",
      trend: "improving"
    }
  ];

  const trendData = [
    { name: 'Week 1', infrastructure: 24, code: 15, flaky: 18 },
    { name: 'Week 2', infrastructure: 28, code: 13, flaky: 22 },
    { name: 'Week 3', infrastructure: 26, code: 19, flaky: 16 },
    { name: 'Week 4', infrastructure: 32, code: 11, flaky: 19 },
    { name: 'Week 5', infrastructure: 22, code: 16, flaky: 23 },
    { name: 'Week 6', infrastructure: 30, code: 18, flaky: 21 },
  ];

  const getFailureTypeClass = (type: string) => {
    switch(type) {
      case "Infrastructure":
        return "bg-jenkins-blue text-white";
      case "Code":
        return "bg-jenkins-green text-white";
      case "Flaky Test":
        return "bg-jenkins-yellow text-foreground";
      default:
        return "bg-muted";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "Diagnosed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
      case "Investigating":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
      case "Fixed":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case "Reopened":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const getTrendBadge = (trend: string) => {
    switch(trend) {
      case "improving":
        return <span className="text-jenkins-green flex items-center"><ArrowRight className="h-3 w-3 rotate-[-45deg]" /> Improving</span>;
      case "declining":
        return <span className="text-jenkins-red flex items-center"><ArrowRight className="h-3 w-3 rotate-45deg]" /> Declining</span>;
      case "stable":
        return <span className="text-jenkins-teal flex items-center"><ArrowRight className="h-3 w-3" /> Stable</span>;
      default:
        return null;
    }
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    
    // Simulate data refreshing
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data refreshed",
        description: "Dashboard has been updated with the latest data from ci.jenkins.io",
      });
    }, 1500);
  };

  return (
    <>
      {/* Hero section */}
      <section className="jenkins-gradient py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 animate-fadeIn">
              Jenkins AI Detective
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Domain-specific LLM trained on ci.jenkins.io data to help with build failure diagnosis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/chat')} 
                className="bg-white text-primary hover:bg-white/90"
                size="lg"
              >
                Try the AI Chat <MessageSquare className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate('/analytics')} 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                size="lg"
              >
                View Analytics <BarChart2 className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Controls */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleRefreshData} disabled={isRefreshing}>
              {isRefreshing ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="repositories">Repositories</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TooltipProvider>
                  <Card className="jenkins-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <Server className="mr-2 h-5 w-5 text-jenkins-blue" /> 
                          Infrastructure Issues
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Issues related to build agents, network connectivity, or Jenkins server configuration.
                          </TooltipContent>
                        </Tooltip>
                      </CardTitle>
                      <CardDescription>Server or environment related</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold">42%</p>
                        <div className="text-sm text-jenkins-blue">+5.3% from last {selectedTimeRange}</div>
                      </div>
                      <p className="text-sm text-muted-foreground">of all failures</p>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress toward reduction goal</span>
                          <span>58%</span>
                        </div>
                        <Progress value={58} className="h-2 bg-muted" indicatorClassName="bg-jenkins-blue" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="jenkins-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <Code className="mr-2 h-5 w-5 text-jenkins-green" /> 
                          Code Issues
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Legitimate failures due to bugs or incompatibilities in the source code.
                          </TooltipContent>
                        </Tooltip>
                      </CardTitle>
                      <CardDescription>Due to actual code changes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold">27%</p>
                        <div className="text-sm text-jenkins-green">-2.7% from last {selectedTimeRange}</div>
                      </div>
                      <p className="text-sm text-muted-foreground">of all failures</p>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Fix rate</span>
                          <span>73%</span>
                        </div>
                        <Progress value={73} className="h-2 bg-muted" indicatorClassName="bg-jenkins-green" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="jenkins-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <Repeat className="mr-2 h-5 w-5 text-jenkins-yellow" /> 
                          Flaky Tests
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Tests that pass and fail inconsistently without code changes, often due to timing or external dependencies.
                          </TooltipContent>
                        </Tooltip>
                      </CardTitle>
                      <CardDescription>Unreliable test outcomes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold">31%</p>
                        <div className="text-sm text-jenkins-yellow">+1.2% from last {selectedTimeRange}</div>
                      </div>
                      <p className="text-sm text-muted-foreground">of all failures</p>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Identification accuracy</span>
                          <span>86%</span>
                        </div>
                        <Progress value={86} className="h-2 bg-muted" indicatorClassName="bg-jenkins-yellow" />
                      </div>
                    </CardContent>
                  </Card>
                </TooltipProvider>
              </div>

              <Card className="jenkins-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Failures</CardTitle>
                    <CardDescription>Latest build failures with AI diagnosis</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/analytics')}>
                    <LineChart className="mr-2 h-4 w-4" />
                    Detailed Analysis
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left font-medium">Repository</th>
                          <th className="py-3 px-4 text-left font-medium">Job</th>
                          <th className="py-3 px-4 text-left font-medium">Build</th>
                          <th className="py-3 px-4 text-left font-medium">Time</th>
                          <th className="py-3 px-4 text-left font-medium">Type</th>
                          <th className="py-3 px-4 text-left font-medium">Status</th>
                          <th className="py-3 px-4 text-left font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentFailures.map(failure => (
                          <tr key={failure.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{failure.repo}</td>
                            <td className="py-3 px-4 text-sm">{failure.job}</td>
                            <td className="py-3 px-4">{failure.build}</td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">{failure.time}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFailureTypeClass(failure.type)}`}>
                                {failure.type}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(failure.status)}`}>
                                {failure.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8" 
                                onClick={() => {
                                  navigate('/chat');
                                  toast({
                                    title: "Build selected",
                                    description: `Analyzing ${failure.repo} ${failure.build}`,
                                  });
                                }}
                              >
                                <Zap className="h-4 w-4 mr-1" />
                                Analyze
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto" onClick={() => navigate('/analytics')}>
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="jenkins-card">
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                    <CardDescription>The Jenkins AI Detective process</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <DatabaseZap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Data Analysis</h3>
                        <p className="text-sm text-muted-foreground">Analysis of ci.jenkins.io data with machine learning</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Blocks className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">LLM Fine-tuning</h3>
                        <p className="text-sm text-muted-foreground">Enhancing the LLM with Jenkins-specific knowledge</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">AI Diagnosis</h3>
                        <p className="text-sm text-muted-foreground">Intelligent analysis of build failures</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/about')}>
                      Learn More About The Project <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="jenkins-card">
                  <CardHeader>
                    <CardTitle>Get Started</CardTitle>
                    <CardDescription>Try the Jenkins AI Detective</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">
                      Ask the AI about Jenkins build failures and get intelligent diagnoses. The model 
                      has been fine-tuned with data from ci.jenkins.io.
                    </p>
                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="font-medium mb-2">Example Questions</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-primary" />
                          "Why did the Jenkins Core build #5823 fail?"
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-primary" />
                          "Is the Plugin BOM test failure a flaky test?"
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-primary" />
                          "What's causing infrastructure failures this month?"
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => navigate('/chat')} className="w-full">
                      Start AI Chat <MessageSquare className="ml-2 h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="repositories" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold">Monitored Repositories</h2>
                  <p className="text-sm text-muted-foreground">CI/CD data from Jenkins repositories</p>
                </div>
                <Button variant="outline" size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Repository
                </Button>
              </div>
              
              {repositories.map(repo => (
                <Card key={repo.id} className="jenkins-card overflow-hidden">
                  <div className={`h-1 w-full ${
                    repo.trend === "improving" ? "bg-jenkins-green" : 
                    repo.trend === "declining" ? "bg-jenkins-red" : "bg-jenkins-teal"
                  }`} />
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GitPullRequest className="mr-2 h-5 w-5" />
                      {repo.name}
                    </CardTitle>
                    <CardDescription>{repo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-muted rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground">Failure Rate</p>
                        <p className="text-2xl font-bold">{repo.failureRate}%</p>
                        <p className="text-xs mt-1">{getTrendBadge(repo.trend)}</p>
                      </div>
                      <div className="bg-jenkins-blue/10 rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground">Infra Issues</p>
                        <p className="text-2xl font-bold">{repo.infraIssues}</p>
                        <p className="text-xs mt-1">{Math.round(repo.infraIssues / (repo.infraIssues + repo.codeIssues + repo.flakyTests) * 100)}% of failures</p>
                      </div>
                      <div className="bg-jenkins-green/10 rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground">Code Issues</p>
                        <p className="text-2xl font-bold">{repo.codeIssues}</p>
                        <p className="text-xs mt-1">{Math.round(repo.codeIssues / (repo.infraIssues + repo.codeIssues + repo.flakyTests) * 100)}% of failures</p>
                      </div>
                      <div className="bg-jenkins-yellow/10 rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground">Flaky Tests</p>
                        <p className="text-2xl font-bold">{repo.flakyTests}</p>
                        <p className="text-xs mt-1">{Math.round(repo.flakyTests / (repo.infraIssues + repo.codeIssues + repo.flakyTests) * 100)}% of failures</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                      <div className="bg-background border px-3 py-1 rounded-full">
                        {repo.buildCount} builds analyzed
                      </div>
                      <div className="bg-background border px-3 py-1 rounded-full">
                        Last build: {repo.lastBuild}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => {
                      navigate('/analytics');
                      toast({
                        title: `Loading ${repo.name} analytics`,
                        description: "Please wait while we gather the data...",
                      });
                    }}>
                      View Analytics <BarChart2 className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={() => {
                      navigate('/chat');
                      toast({
                        title: `Selected ${repo.name}`,
                        description: "You can now ask questions about this repository.",
                      });
                    }}>
                      Ask AI <MessageSquare className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card className="jenkins-card">
                <CardHeader>
                  <CardTitle>Failure Trends Over Time</CardTitle>
                  <CardDescription>Historic data of failure types by week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReLineChart
                        data={trendData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ReTooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="infrastructure" 
                          stroke="#335061" 
                          name="Infrastructure Issues"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="code" 
                          stroke="#91c89c" 
                          name="Code Issues"
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="flaky" 
                          stroke="#f0d943" 
                          name="Flaky Tests"
                          strokeWidth={2}
                        />
                      </ReLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/analytics')}>
                    <LineChart className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="jenkins-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 min-w-4 min-h-4 bg-jenkins-blue rounded-full"></div>
                      <p className="text-sm">Infrastructure issues have increased 5.3% over the last month, primarily due to network connectivity problems in the build agents.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 min-w-4 min-h-4 bg-jenkins-green rounded-full"></div>
                      <p className="text-sm">Code-related failures have decreased 2.7%, indicating improved code quality or better pre-commit testing.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 min-w-4 min-h-4 bg-jenkins-yellow rounded-full"></div>
                      <p className="text-sm">Flaky test detection has improved 15%, allowing better isolation of unreliable tests from real failures.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="jenkins-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Short Term</h4>
                      <p className="text-sm text-muted-foreground">
                        Investigate the network connectivity issues affecting the infrastructure.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Medium Term</h4>
                      <p className="text-sm text-muted-foreground">
                        Update test frameworks to better handle timeouts and improve stability.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Long Term</h4>
                      <p className="text-sm text-muted-foreground">
                        Implement more robust CI/CD infrastructure with better error handling.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="jenkins-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/chat')}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ask AI for Recommendations
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/analytics')}>
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Explore Detailed Analytics
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => {
                      toast({
                        title: "Report generated",
                        description: "A detailed PDF report has been downloaded.",
                      });
                    }}>
                      <Download className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default Index;
