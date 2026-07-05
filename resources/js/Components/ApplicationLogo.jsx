import LogoKiyutz from '@/assets/LogoKiyutz.png';   
export default function ApplicationLogo(props) {
    return (
        <img
            src={LogoKiyutz}
            alt="Kiyutz"
            {...props}   
        />
    );
}
