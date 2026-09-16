"use client";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { animatePageOut } from "@/context/animatePageIn";

const TransitionLink = ({ href, label, children, className, onClick }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e) => {
    if (pathname !== href) {
      e.preventDefault();
      animatePageOut(href, router);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      aria-label={typeof label === "string" && label ? label : undefined}
    >
      {children || label}
    </Link>
  );
};

TransitionLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default TransitionLink;
