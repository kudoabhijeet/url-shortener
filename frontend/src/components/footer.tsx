import { Github, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full py-4 mt-10 border-t">
      <div className="container flex justify-center items-center gap-4">
        <a
          href="https://github.com/kudoabhijeet"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75 transition-opacity"
        >
          <Github size={24} />
        </a>
        <a
          href="https://linkedin.com/in/kudoabhijeet"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75 transition-opacity"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://kudoabhijeet.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75 transition-opacity"
        >
          <Globe size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
