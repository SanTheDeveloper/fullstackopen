const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
  };

  return (
    <div style={footerStyle}>
      <br />
      <p>
        Note app, Department of Computer Science, University of Helsinki 2026
      </p>
    </div>
  );
};

export default Footer;

/* 
When writing component styles, use CSS Modules or Tailwind 
for all structural layout (like grids, margins, and mobile breakpoints) 
and interactive elements (like hovers and active button states) 
because the browser processes these static stylesheets natively. 
Reserve inline styles exclusively for high-frequency, 
data-driven values or real-time states—such as scroll-based opacity, 
drag-and-drop coordinates, or user-selected colors—that change too 
dynamically at runtime to be predefined in a static file.
*/
