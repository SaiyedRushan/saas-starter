import {Button} from './ui/button'

export default function Footer() {
  return (
    <footer className="border-t bg-background py-10 text-center text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        &copy; {new Date().getFullYear()} SaaS Platform. All rights reserved.
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Button variant="link" asChild>
            <a href="/about">About</a>
          </Button>
          <Button variant="link" asChild>
            <a href="/contact">Contact</a>
          </Button>
          <Button variant="link" asChild>
            <a href="/feature-requests">Feature Requests</a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
