import React from 'react';
// import noteContext from '../Context/notes/noteContext';

function About() {
  // const context = useContext(noteContext); // Access the context value

  return (
    <div className="container mt-5">
      <h1>About iNoteBook</h1>
      <p>
        Welcome to <strong>iNoteBook</strong>, a simple and intuitive note-taking
        application designed to help you organize your thoughts, ideas, and important
        information. Whether you are a student, a professional, or just someone who needs
        to quickly jot down ideas, iNoteBook makes it easy to keep everything in one place.
      </p>

      <h2>Features</h2>
      <ul>
        <li><strong>Create and manage notes:</strong> Easily create, edit, and delete your notes.</li>
        <li><strong>Organize by categories:</strong> Organize your notes into categories for better management.</li>
        <li><strong>Search functionality:</strong> Quickly search through your notes to find important information.</li>
        <li><strong>Responsive design:</strong> iNoteBook is designed to work on all devices, from desktops to smartphones.</li>
        <li><strong>Secure:</strong> Your notes are stored securely with encrypted data for your privacy.</li>
      </ul>

      <h2>How It Works</h2>
      <p>
        iNoteBook uses a user-friendly interface with simple navigation. To get started, sign up for a free account and log in to begin creating and organizing your notes.
        You can add, edit, and delete notes, as well as group them into categories for easy access.
      </p>

      <h2>Technologies Used</h2>
      <p>
        iNoteBook is built with the following technologies:
      </p>
      <ul>
        <li><strong>Frontend:</strong> React.js, JSX, CSS</li>
        <li><strong>Backend:</strong> Node.js, Express.js</li>
        <li><strong>Database:</strong> MongoDB with Mongoose</li>
      </ul>

      <h2>Our Mission</h2>
      <p>
        Our goal is to provide an easy-to-use, secure, and reliable note-taking platform that helps users
        manage their ideas and work more effectively. iNoteBook aims to simplify the process of note-taking
        and increase productivity for everyone.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or feedback, feel free to contact us at <a href="mailto:support@inotebook.com">support@inotebook.com</a>.
      </p>
    </div>
  );
}

export default About;
