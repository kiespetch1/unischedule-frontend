import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoginSkeleton = () => {
    return (
        <div style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            width: "300px",
            height: "246px"
        }}>
            <Skeleton height={25} width={150} style={{marginTop: 20}}/>
            <Skeleton height={20} width={200} style={{marginTop: 10}}/>
            <Skeleton height={40} width={152} style={{marginTop: 60}}/>
        </div>
    );

};

export default LoginSkeleton;
