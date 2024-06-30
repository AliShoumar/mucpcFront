import { ReactElement } from "react";
import Pagination from '@mui/material/Pagination';


export const FooterPagination = ():ReactElement =>{

    return <footer style={{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'3rem',
        marginBottom:'2rem'
    }}>
        <Pagination count={5} color="primary"/>
    </footer>
}