import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLinkedinIn,
  FaHeart,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      {/* Main Footer */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <h2 className="text-primary fw-bold mb-3">🛍 ShopSphere</h2>

            <p className="text-light opacity-75 mb-4">
              Your one-stop destination for quality products at the best prices.
            </p>

            <p className="small text-secondary mb-0">
              Shop smart. Shop easy. ShopSphere.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3">Quick Links</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/home" className="footer-link">
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/cart" className="footer-link">
                  Cart
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/wishlist" className="footer-link">
                  Wishlist
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/orders" className="footer-link">
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/profile" className="footer-link">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3">Customer Support</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="mailto:support@shopsphere.com" className="footer-link">
                  Contact Us
                </a>
              </li>

              <li className="mb-2">
                <a href="mailto:support@shopsphere.com" className="footer-link">
                  Help Center
                </a>
              </li>

              <li className="mb-2">
                <Link to="/shipping-policy" className="footer-link">
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link to="/return-policy" className="footer-link">
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3">Follow Us</h5>

            <p className="text-light opacity-75 small">
              Stay connected with ShopSphere.
            </p>

            <div className="d-flex gap-2 mt-3">
              <a
                href="https://www.facebook.com/share/1BgWb7oSot/"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/abhay_prajapati746?igsh=MXE5Z2g4cmkyY3Rubw==&utm_source=ig_contact_invite"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://x.com/AbhayKu04424853"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/abhay-kumar-6562a6332?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com/AbhayKumar"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>


            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-top border-secondary">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 small text-secondary">
                © {new Date().getFullYear()} ShopSphere. All Rights Reserved.
              </p>
            </div>

            <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
              <span className="small text-secondary">
                Made with <FaHeart className="text-danger mx-1" />
                by Abhay Kumar Software Engineering
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
