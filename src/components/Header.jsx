import '../css/Header.styles.css'

const Header = () => {
    return (
        <nav>
            <div className="logo-container">
                <a href="https://www.alainfurter.com" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/logo.png" alt="Logo" />
                </a>
            </div>
            <div className="links-container">
                <ul id="menu">
                    <li data-menuanchor="logon-hint" id="logo-hint"><a href="https://youtu.be/q14OTYVKMWc" target="_blank" rel="noopener noreferrer">Logon Hint</a></li>
                    <li data-menuanchor="twitter" className='social'>
                        <a href="https://www.twitter.com/FurterAlain" className="social-image-container">
                            <img src="/assets/images/socials/twitter-icon-white.png" alt="Twitter image" />
                        </a>
                    </li>
                    <li data-menuanchor="linkedin" className='social'>
                        <a href="https://www.linkedin.com/in/alain-furter-18707315" className="social-image-container">
                            <img src="/assets/images/socials/linkedin-icon-white.png" alt="Linkedin image" />
                        </a>
                    </li>
                    <li data-menuanchor="github" className='social'>
                        <a href="https://github.com/alainfurter" className="social-image-container">
                            <img src="/assets/images/socials/github-icon-white.png" alt="Github image" />
                        </a>
                    </li>
                    <li data-menuanchor="email" className='social'>
                        <a href="mailto:alain.furter@gmail.com?subject=Inquiry for Alain Furter" className="social-image-container">
                            <img src="/assets/images/socials/mail-icon-white.png" alt="Email image" />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
      )
}

export default Header;