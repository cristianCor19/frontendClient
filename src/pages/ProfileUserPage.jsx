import { Link} from 'react-router-dom'
import 'boxicons'
import '../styles/profile.css'
import { useSession } from '../context/SessionContext';


function ProfileUserPage(){
    const { profile } = useSession();

    console.log(profile);
    

    return (
        <div className="container--profile">
            <div className="container-profile-personal">
                <Link to={'/'}>
                    <div className='camera-icon'>
                        <img src="/img/profile.png" alt="" className='personal-img'/>
                        <box-icon name='camera' color='' size='sm'></box-icon>
                    </div>
                </Link>
                <div className='personal--info'>
                    <h3>{profile.name} {profile.lastname}</h3>
                    <p>{profile.email}</p>
                </div>
            </div>

            <div className="container-profile-options">
                <li>
                    <ul className='options--profile personal'>
                        <box-icon name='id-card' size='lg' color=''></box-icon>
                        <div>
                            <h3>Informacion personal</h3>
                            <p>Informacion sobre tus documentos</p>
                        </div>
                    </ul>
                    <ul className='options--profile account'>
                        <box-icon className='profile--icon' name='user' size='lg'></box-icon>
                        <div>
                            <h3>Datos de cuenta</h3>
                            <p>Datos sobre tu cuenta en infotect solutions</p>
                        </div>
                    </ul>
                </li>
            </div>
        </div>

    )
}

export default ProfileUserPage;