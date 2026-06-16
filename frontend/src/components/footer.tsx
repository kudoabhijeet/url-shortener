import { Github, Linkedin, Globe } from "lucide-react";

const links = [
  { href: "https://github.com/kudoabhijeet", label: "GitHub", Icon: Github },
  {
    href: "https://linkedin.com/in/kudoabhijeet",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  { href: "https://kudoabhijeet.com", label: "Website", Icon: Globe },
];

const Footer = () => {
  return (
    <div className="mt-8 flex items-center justify-center gap-1 border-t border-slate-100 pt-5 dark:border-white/10">
      {links.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-brand-600 dark:text-slate-500 dark:hover:bg-white/10 dark:hover:text-brand-200"
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  );
};

export default Footer;
