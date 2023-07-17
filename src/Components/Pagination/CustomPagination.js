import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({setPageNum, totalPages}) => {
    

    const paginationHandler=(e)=>{
        setPageNum(e.target.textContent)
        window.scroll(0,0)
    }

  return (
    <Stack spacing={2} style={{margin:"10px 0px", display:"flex", alignItems:"center"}}>
      <Pagination onClick={paginationHandler} hidePrevButton="true" hideNextButton="true" count={totalPages} color="primary"/>
    </Stack>
  )
}

export default CustomPagination;