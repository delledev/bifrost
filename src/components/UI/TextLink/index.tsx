const TextLink = ({ children, ...props }) => {
  return (
    <a {...props} className="font-light text-primary text-xl dark:text-white">
      {children}
    </a>
  );
};

export default TextLink;
