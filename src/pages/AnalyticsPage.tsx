
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  LineChart, 
  Line,
  Cell as RechartsCell
} from "recharts";
import { 
  Download, 
  Filter, 
  RefreshCw, 
  Calendar, 
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart2,
  GitBranch,
  ArrowUpDown
} from "lucide-react";

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState("trends");
  const [timeRange, setTimeRange] = useState("month");
  const [isLoading, setIsLoading] = useState(false);

  // Demo data for visualizations
  const failureTrendData = [
    { name: 'Week 1', infrastructure: 24, code: 15, flaky: 18 },
    { name: 'Week 2', infrastructure: 28, code: 13, flaky: 22 },
    { name: 'Week 3', infrastructure: 26, code: 19, flaky: 16 },
    { name: 'Week 4', infrastructure: 32, code: 11, flaky: 19 },
    { name: 'Week 5', infrastructure: 22, code: 16, flaky: 23 },
    { name: 'Week 6', infrastructure: 30, code: 18, flaky: 21 },
  ];

  const repositoryData = [
    { name: 'Jenkins Core', failures: 45, fixes: 32 },
    { name: 'Plugin BOM', failures: 32, fixes: 28 },
    { name: 'Test Harness', failures: 38, fixes: 22 },
    { name: 'Pipeline', failures: 25, fixes: 20 },
    { name: 'Docker Plugin', failures: 18, fixes: 15 },
  ];

  const failureTypeData = [
    { name: 'Infrastructure', value: 42 },
    { name: 'Code Issues', value: 27 },
    { name: 'Flaky Tests', value: 31 },
  ];

  const COLORS = ['#335061', '#91c89c', '#f0d943'];

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Jenkins Build Analytics</h1>
          <p className="text-muted-foreground">Visualize and analyze build failure patterns from ci.jenkins.io</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
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
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="trends" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-4 mb-8">
          <TabsTrigger value="trends">
            <TrendingUp className="mr-2 h-4 w-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="repositories">
            <GitBranch className="mr-2 h-4 w-4" />
            Repositories
          </TabsTrigger>
          <TabsTrigger value="failure-types">
            <PieChartIcon className="mr-2 h-4 w-4" />
            Failure Types
          </TabsTrigger>
          <TabsTrigger value="comparisons">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Comparisons
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends">
          <Card className="jenkins-card">
            <CardHeader>
              <CardTitle>Failure Trends Over Time</CardTitle>
              <CardDescription>Analysis of failure patterns over the last {timeRange}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={failureTrendData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
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
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Infrastructure Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">27.0</div>
                    <div className="text-xs text-muted-foreground">Average per week</div>
                    <div className="text-sm text-jenkins-blue mt-1">+5.3% from previous period</div>
                  </CardContent>
                </Card>
                <Card className="bg-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Code Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15.3</div>
                    <div className="text-xs text-muted-foreground">Average per week</div>
                    <div className="text-sm text-jenkins-green mt-1">-2.7% from previous period</div>
                  </CardContent>
                </Card>
                <Card className="bg-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Flaky Tests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">19.8</div>
                    <div className="text-xs text-muted-foreground">Average per week</div>
                    <div className="text-sm text-jenkins-yellow mt-1">+1.2% from previous period</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto">
                <Download className="mr-2 h-4 w-4" />
                Download Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="repositories">
          <Card className="jenkins-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Repository Analysis</CardTitle>
                <CardDescription>Failure rates across Jenkins repositories</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={repositoryData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="failures" fill="#335061" name="Failures" />
                    <Bar dataKey="fixes" fill="#91c89c" name="Fixes Applied" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Repository</th>
                        <th className="text-center py-3 px-4">Total Failures</th>
                        <th className="text-center py-3 px-4">Fix Rate</th>
                        <th className="text-center py-3 px-4">Top Failure Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Jenkins Core</td>
                        <td className="text-center py-3 px-4">45</td>
                        <td className="text-center py-3 px-4">71%</td>
                        <td className="text-center py-3 px-4">Infrastructure</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Plugin BOM</td>
                        <td className="text-center py-3 px-4">32</td>
                        <td className="text-center py-3 px-4">88%</td>
                        <td className="text-center py-3 px-4">Code</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Test Harness</td>
                        <td className="text-center py-3 px-4">38</td>
                        <td className="text-center py-3 px-4">58%</td>
                        <td className="text-center py-3 px-4">Flaky Tests</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="failure-types">
          <Card className="jenkins-card">
            <CardHeader>
              <CardTitle>Failure Types Distribution</CardTitle>
              <CardDescription>Breakdown of failure categories across all repositories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={failureTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {failureTypeData.map((entry, index) => (
                          <RechartsCell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Failure Type Analysis</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Based on analysis of CI/CD data from ci.jenkins.io, we've categorized build failures into three primary types.
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-jenkins-blue/10">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-4 h-4 rounded-full bg-jenkins-blue"></div>
                          <h4 className="font-medium">Infrastructure Issues (42%)</h4>
                        </div>
                        <p className="text-sm">Problems related to build agents, network connectivity, or the Jenkins server itself.</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-jenkins-green/10">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-4 h-4 rounded-full bg-jenkins-green"></div>
                          <h4 className="font-medium">Code Issues (27%)</h4>
                        </div>
                        <p className="text-sm">Legitimate failures caused by actual bugs or incompatibilities in the codebase.</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-jenkins-yellow/10">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-4 h-4 rounded-full bg-jenkins-yellow"></div>
                          <h4 className="font-medium">Flaky Tests (31%)</h4>
                        </div>
                        <p className="text-sm">Tests that pass and fail inconsistently without code changes, often due to timing or external dependencies.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparisons">
          <Card className="jenkins-card">
            <CardHeader>
              <CardTitle>Cross-Repository Comparison</CardTitle>
              <CardDescription>Side-by-side analysis of failure patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Infrastructure', core: 18, bom: 10, harness: 14 },
                      { name: 'Code', core: 12, bom: 16, harness: 9 },
                      { name: 'Flaky', core: 15, bom: 6, harness: 16 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="core" fill="#335061" name="Jenkins Core" />
                    <Bar dataKey="bom" fill="#6699cc" name="Plugin BOM" />
                    <Bar dataKey="harness" fill="#33b5e5" name="Test Harness" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-medium mb-2">Key Insights</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Jenkins Core suffers from more infrastructure-related failures than other repositories</li>
                  <li>Plugin BOM has the highest proportion of code-related failures, indicating potential dependency issues</li>
                  <li>Test Harness shows a high number of flaky tests, suggesting timing or resource constraints</li>
                  <li>Overall, infrastructure issues remain the leading cause of failures across all repositories</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <BarChart2 className="mr-2 h-4 w-4" />
                View Detailed Report
              </Button>
              <Button>
                Run AI Analysis
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
