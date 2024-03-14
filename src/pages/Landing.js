import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className='container page'>
                {/* info */}
                <div className='info'>
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>
                        Shabby chic seitan gluten-free, fanny pack JOMO biodiesel coloring book. Vape forage meggings roof party street art jawn. Church-key meditation put a bird on it salvia post-ironic hashtag.
                    </p>
                    <Link to='/register' className='btn btn-hero'>Login/Register</Link>
                </div>
                <img src={main} alt='job hunt' className='img main-img'></img>
            </div>
        </Wrapper>
    );
}


export default Landing;

