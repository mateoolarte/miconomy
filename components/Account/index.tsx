import { useState, ReactElement,useEffect } from 'react';

import { useMutation,useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { getCookie,deleteCookie } from '../../utils/cookies';
import { USER_TOKEN_KEY } from '../../utils/constants';
import { USER } from '../../graphql/queries/user';
import { DEL_USER } from '../../graphql/mutations/deleteUser';
import { CHANGE_PASS } from '../../graphql/mutations/changePassword';

import Input from '../ui/Input';
import Logout from '../ui/icons/Logout';

export default function Login(props): ReactElement {
    
    const [name,setName]=useState(""),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[showAlert,setShowAlert]=useState(false) 
    const router = useRouter();
    const { loading } = useQuery(USER, {
        variables: { 
            token:getCookie(USER_TOKEN_KEY)
        },
        onCompleted(data){
            const response = data?.getUser
            setName(response.name?response.name:"Jhon Doe")
            setEmail(response.email?response.email:"Jhon@Doe")
        },
        onError(){
            router.push({
                pathname: '/',
                query: {
                    message:"Something went wrong",
                    },
            });
        }
    }
    );
    const [changePass] = useMutation(CHANGE_PASS, {
        onCompleted(data){
            const response = data?.getUser
            alert("Password changed successfully")
        },
        onError(){
            router.push({
                pathname: '/',
                query: {
                    message:"Something went wrong",
                    },
            });
        }
    }
    )
    const [deleteAccount]= useMutation(DEL_USER, {
        onCompleted(data){
            deleteCookie(USER_TOKEN_KEY)
            alert("User deleted successfully")
            router.push({
                pathname: '/login',
                query: {
                    message:"User deleted successfully",
                    },
            });
        },
        onError(){
            router.push({
                pathname: '/login',
                query: {
                    message:"Something went wrong",
                    },
            });
        }
    }
    )

    useEffect(() => {
        //Datafetch from the gql
        if(loading){
            setName("...")
            setEmail("...")
            setPassword("")
        }
    }, [])

    const goHome = ():void=>{
        router.push({
            pathname: '/dashboard'
        });
    }
    const updateUser = ():void=>{
        //Update user with the graphql
        changePass({
                variables: { 
                    token:getCookie(USER_TOKEN_KEY),
                    password:password
                }
            })
    }

    const delUser = ():void=>{
        //Update user with the graphql
        deleteAccount({
            variables: { 
                token:getCookie(USER_TOKEN_KEY)
            }
        })
    }

    return (
    <div className="flex flex-col mt-12 w-11/12 md:max-w-xl mx-auto">
        <button
        onClick={goHome}
        className="w-auto no-underline px-8 py-2 self-center rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white"
        >
            back to dashboard
        </button>
        <Input
            type="text"
            label="Change Name"
            value={name}
            className="w-full"
            errorMessage={null}
            onChange={(event)=>{setName(event.target.value)}}
        />
        <Input
            type="email"
            label="Change"
            value={email}
            className="w-full"
            errorMessage={null}
            onChange={(event)=>{setEmail(event.target.value)}}
        />
        <Input
            type="password"
            label="Password"
            value={password}
            className="w-full"
            errorMessage={null}
            showPlainPassword={true}
            onChange={(event)=>{setPassword(event.target.value)}}
        />
        {showAlert && ( <Alert cancel={()=>{setShowAlert(false)}} delete={delUser}/>)}
        <button
        onClick={updateUser}
        className="w-auto no-underline px-8 py-2 self-center md:self-end rounded-md border bg-indigo-500 hover:bg-indigo-200 text-white "
        >Actualizar Contraseña</button>

        <button
        onClick={()=>{setShowAlert(true)}}
        className="w-auto no-underline px-8 py-2 mt-20 self-center rounded-md border border-red-500 hover:bg-red-500 text-red-500 hover:text-white"
        >Eliminar</button>
        <button
        onClick={updateUser}
        className="w-auto no-underline px-8 py-2 mt-20 self-center rounded-md border border-none text-red-500 hover:text-red-700 whitespace-nowrap"
        >Salir <Logout className="inline-block"/></button>
    </div>)
}

function Alert(props): ReactElement{

    return(
        <div className="w-full h-full top-0 left-0 absolute bg-indigo-600 bg-opacity-70 flex md:items-center items-end  justify-center md:py-0 py-10">
            <div className="bg-white md:w-3/5 w-11/12 rounded-lg p-10">
                <p>
                    Your profile and all your information will be erased. Do you want to continue ?
                </p>
                <button
                onClick={props.delete}
                className="w-auto no-underline px-8 py-2 mt-20 self-center rounded-md border border-red-500 hover:bg-red-500 text-red-500 hover:text-white"
                >Eliminar</button>
                <button
                onClick={props.cancel}
                className="w-auto no-underline px-8 py-2 mt-20 self-center rounded-md border border-gray-300 hover:bg-gray-300 text-gray-300 hover:text-white float-right"
                >Cancel</button>
            </div>
        </div>
    )
}