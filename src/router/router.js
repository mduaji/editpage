import get from "../components/get";
import edit from '../components/edit'


export const routes=[
    {path:'/main',component:get},
    {path:'/edit/:Id',component:edit},
    {path:'*',redirect:'/main'}
]