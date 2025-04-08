
import { Link } from "react-router-dom";
import { GithubIcon, ExternalLink, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg">Jenkins AI Detective</h3>
            <p className="text-sm text-muted-foreground">
              Domain-specific LLM based on actual Jenkins usage data from ci.jenkins.io
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="https://github.com/jenkins-infra/Enhancing-LLM-with-Jenkins-Knowledge/"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon className="h-5 w-5" />
              </Link>
              <Link
                to="https://ci.jenkins.io/"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
              <Link
                to="mailto:info@example.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Navigate</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/chat" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI Chat
                </Link>
              </li>
              <li>
                <Link 
                  to="/analytics" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="https://www.jenkins.io/doc/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  Jenkins Documentation
                </Link>
              </li>
              <li>
                <Link 
                  to="https://ci.jenkins.io/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  ci.jenkins.io
                </Link>
              </li>
              <li>
                <Link 
                  to="https://github.com/jenkins-infra/Enhancing-LLM-with-Jenkins-Knowledge/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link 
                  to="https://www.jenkins.io/community/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  Jenkins Community
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Stay updated with the latest developments in Jenkins AI.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 bg-background border rounded text-sm w-full"
              />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {currentYear} Jenkins AI Detective. A Proof of Concept project.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-jenkins-red" />
            <span>for the Jenkins community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
