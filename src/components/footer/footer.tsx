import instagramIcon from "../assets/1161953_instagram_icon.png";
import linkedinIcon from "../assets/104493_linkedin_icon.png";
import gitHubIcon from "../assets/394189_code_github_repository_icon.png";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <p className="mb-0">
              © 2025 Country Search App. All rights reserved.
            </p>
          </div>

          <div className="col-12 col-md-6 text-center text-md-end">
            <div className="d-inline-block mx-3">
              <a
                href="https://instagram.com"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  width={30}
                  height={30}
                />
              </a>
            </div>
            <div className="d-inline-block mx-3">
              <a
                href="https://www.linkedin.com/in/jesus-eduardo-campo-alvarez-4394b9199/"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedinIcon} alt="LinkedIn" width={30} height={30} />
              </a>
            </div>
            <div className="d-inline-block mx-3">
              <a
                href="https://github.com/eduardocampo91"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={gitHubIcon} alt="LinkedIn" width={30} height={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
