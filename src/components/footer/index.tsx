import { Separator } from "@/components/ui/separator";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="max-w-screen-xl mx-auto mt-4">
        <Separator />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-center gap-x-2 gap-y-5 px-6 xl:px-0">
          <div className="flex items-center jce gap-5 text-muted-foreground">
            <Link href="https://instagram.com/ahifnywahid/" target="_blank">
              <InstagramIcon className="h-5 w-5" />
            </Link>
            <Link href="https://facebook.com/gopretoriginal/" target="_blank">
              <FacebookIcon className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com/in/alhifnywahid/" target="_blank">
              <LinkedinIcon className="h-5 w-5" />
            </Link>
            <Link href="https://github.com/alhifnywahid" target="_blank">
              <GithubIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
