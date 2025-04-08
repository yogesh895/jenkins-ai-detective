
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Database, 
  Code, 
  Server, 
  AlertCircle, 
  Repeat, 
  BarChart4,
  GitBranch,
  Github,
  CheckCircle,
  Workflow,
  Layers
} from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Jenkins AI Detective</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              Project Overview
            </CardTitle>
            <CardDescription>
              Domain-specific LLM based on actual Jenkins usage data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Jenkins AI Detective is a proof-of-concept (PoC) application that uses a domain-specific 
              Language Learning Model (LLM) fine-tuned with Jenkins usage data from ci.jenkins.io. 
              The goal is to help users diagnose build failures by distinguishing between:
            </p>
            
            <ul className="space-y-2 ml-6 list-disc">
              <li className="flex items-start">
                <Server className="mr-2 h-5 w-5 shrink-0 text-jenkins-blue" />
                <span><strong>Infrastructure issues</strong> - Problems with the build environment or Jenkins server</span>
              </li>
              <li className="flex items-start">
                <Code className="mr-2 h-5 w-5 shrink-0 text-jenkins-green" />
                <span><strong>Code-related issues</strong> - Legitimate failures due to code changes</span>
              </li>
              <li className="flex items-start">
                <Repeat className="mr-2 h-5 w-5 shrink-0 text-jenkins-yellow" />
                <span><strong>Flaky tests</strong> - Unreliable tests that produce inconsistent results</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="approach">
          <TabsList className="w-full grid grid-cols-3 mb-8">
            <TabsTrigger value="approach">Approach</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="repositories">Use Cases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="approach" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Workflow className="mr-2 h-5 w-5 text-primary" />
                  Project Methodology
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center">
                    <Database className="mr-2 h-5 w-5 text-jenkins-blue" />
                    Data Collection and Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    The project begins by collecting and analyzing data from ci.jenkins.io. This involves 
                    extracting build logs, test results, and other relevant information from the Jenkins 
                    continuous integration environment.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center">
                    <BarChart4 className="mr-2 h-5 w-5 text-jenkins-green" />
                    Machine Learning Techniques
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    The collected data is processed using advanced machine learning techniques to identify 
                    patterns and correlations. This helps in distinguishing between different types of failures 
                    based on their characteristics.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-jenkins-teal" />
                    LLM Fine-tuning
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    An existing open-source LLM model (like Llama 2) is fine-tuned with the processed 
                    Jenkins-specific data. This creates a domain-specific model that understands Jenkins 
                    build failures and can provide relevant insights.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-jenkins-lightBlue" />
                    Benchmarking and Validation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    The fine-tuned model is benchmarked and validated to ensure its effectiveness in diagnosing 
                    build failures. This involves testing it against known failure scenarios and measuring its accuracy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="technology" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5 text-primary" />
                  Technology Stack
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Frontend</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        React.js
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        TypeScript
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Tailwind CSS
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Backend & ML</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Python
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Ollama
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        LangChain
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">LLM Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    The project leverages open-source LLM models (such as Llama 2) and fine-tunes them 
                    for Jenkins-specific knowledge. The integration is done using frameworks like LangChain 
                    and Ollama, making it easier to deploy and maintain.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Data Processing Pipeline</h3>
                  <p className="text-sm text-muted-foreground">
                    A comprehensive data processing pipeline is implemented to collect, clean, and analyze 
                    the ci.jenkins.io data. This involves extracting relevant information from build logs, 
                    test results, and other sources.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="repositories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GitBranch className="mr-2 h-5 w-5 text-primary" />
                  Sample Repositories and Use Cases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center">
                    <Github className="mr-2 h-5 w-5" />
                    Jenkins Core
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    The main Jenkins server repository, which often experiences a variety of build failures. 
                    The AI Detective can help distinguish between infrastructure issues and legitimate code problems.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center">
                    <Github className="mr-2 h-5 w-5" />
                    Jenkins Acceptance Test Harness
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A framework for testing Jenkins and plugins, which is particularly prone to flaky tests. 
                    The AI can identify patterns in test failures to determine if they are reliable indicators 
                    of actual issues.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center">
                    <Github className="mr-2 h-5 w-5" />
                    Jenkins Plugin BOM
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    The Bill of Materials for Jenkins plugins, which can experience failures due to 
                    incompatibilities between different plugin versions. The AI can help identify 
                    these integration issues.
                  </p>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-3">Related Projects</h3>
                  <div className="flex items-center space-x-2">
                    <Github className="h-5 w-5" />
                    <a 
                      href="https://github.com/jenkins-infra/Enhancing-LLM-with-Jenkins-Knowledge/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      jenkins-infra/Enhancing-LLM-with-Jenkins-Knowledge
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    This project builds on the completed work available in this repository, 
                    which focuses on enhancing LLMs with Jenkins knowledge.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="mt-8 bg-jenkins-blue/10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Layers className="mr-2 h-5 w-5 text-jenkins-blue" />
              Project Goals and Expected Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Jenkins AI Detective project aims to create a full-stack application that demonstrates 
              the potential of domain-specific LLMs in the CI/CD space. The expected outcomes include:
            </p>
            
            <ul className="space-y-2 ml-6 list-disc">
              <li>A fine-tuned LLM model with Jenkins-specific knowledge</li>
              <li>A web application with an intuitive UI for interacting with the model</li>
              <li>Accurate diagnosis of build failures from ci.jenkins.io data</li>
              <li>Benchmarking results to measure the effectiveness of the approach</li>
              <li>Documentation and lessons learned for future similar projects</li>
            </ul>
            
            <div className="bg-white p-4 rounded-lg dark:bg-jenkins-blue/20 mt-4">
              <h3 className="font-medium mb-2 flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-jenkins-yellow" />
                Note: Proof of Concept
              </h3>
              <p className="text-sm text-muted-foreground">
                This application is a proof of concept to demonstrate the potential of AI in diagnosing 
                Jenkins build failures. It's meant to showcase the approach and methodology rather than 
                provide a production-ready solution.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
