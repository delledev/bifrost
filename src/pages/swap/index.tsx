import { Button, Divider, FormControl, IconButton, Input, InputLabel, Menu, MenuItem, MenuList, Select } from '@mui/material';
import Layout from 'components/Layout';
import Typography from 'components/UI/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {FaEthereum} from 'react-icons/fa'
import { IoIosSwap } from "react-icons/io";

import { useContext, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { UserContext } from 'contexts';
import Spinner from 'components/Spinner';
import { ToastContainer, toast } from 'react-toastify';

export default function SwapPage() {
  
  const [swapLoading, setSwapLoading] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fromSwapType, setFromSwapType] = useState<string>('ETH')
  const [fromAmount, setFromAmount] = useState<number>(0)
  const [toSwapType, setToSwapType] = useState<string>('TRY')
  const [toAmount, setToAmount] = useState<number>(0)
  const [bgColor, setBgColor] = useState<string>('')
  
  const rateToTRY = 69326.62
  const rateToETH = 0.000014
  
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const HandleAmountChange = (val:number) => {
    setFromAmount(val)
    if(toSwapType == 'TRY'){
      setToAmount(val * rateToTRY)
    } else {
      setToAmount(val * rateToETH)
    }
  } 
  const handleSwapClick = async () => {
    setSwapLoading(true)
    const headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const responseBankAccounts = await fetch(
      `/api/swap/${toSwapType == 'TRY' ? 'toTRY' : 'toETH'}`,
      {
        method: 'POST',
        body: JSON.stringify({
          fromAmount,
          toAmount
        }),
        headers: headersList,
        
      }
    );
    const data = await responseBankAccounts.json()
    if(responseBankAccounts.status == 200){
      toast(data.message, {type: 'success'})
    }else{
      toast(data.message, {type:'error'})
    }
    setSwapLoading(false)
  }
  const HandleChange = () => {
    if(fromSwapType == 'TRY'){
      setToSwapType('TRY')
      setFromSwapType('ETH')
    }else {
      setToSwapType('ETH')
      setFromSwapType('TRY')
    }
  }
  useEffect(() => {
  setBgColor(localStorage.theme == 'dark' ? '#152336' : 'white')
  },[])
  return (
    <Layout>
      <ToastContainer />
      <div className="flex justify-center items-center h-screen w-screen">
        <div className='flex flex-col ml-12 gap-4 h-auto w-auto p-4 rounded-xl bg-gray-200 dark:bg-gray-800 border-emerald-400 border'>
          <Typography variant='h3'>
            Swap
          </Typography>
          <div className='flex flex-col gap-2'>
            <span className=' rounded-xl w-fit py-1 px-4 bg-blue-400 dark:bg-emerald-400 bg-opacity-25'>
              <span className='text-xs text-blue-800 dark:text-emerald-900 font-bold'>
                {'Slippage < 0.5%'}
              </span>
            </span>
            <div className='flex w-full gap-6'>
            <FormControl variant="filled" >
                  <Select
                    labelId="selectAccount"
                    value={fromSwapType}
                    onChange={(e, i) => {HandleChange()}}
                    variant="outlined"
                    className="outline-none flex-1 dark:bg-[#152336] dark:text-white text-black bg-white rounded-xl"
                    inputProps={{
                      MenuProps: {
                          MenuListProps: {
                              sx: {
                                  backgroundColor: bgColor,
                                  color:'blue',
                              }
                          }
                      }
                  }}
                    >
                    <MenuItem key={'ETH'} value={'ETH'} className='w-full h-full'>
                    <div className='flex w-full h-auto text-xl justify-center items-center gap-4 font-bold dark:text-white text-black '>
                       <FaEthereum />
                        ETH
                    </div>
                    </MenuItem>
                    <MenuItem key={'TRY'} value={'TRY'} className='w-full h-full'>
                    <div className='flex w-full h-auto text-xl justify-center items-center gap-4 font-bold dark:text-white text-black '>
                     <div className='w-[20px] h-auto p-1'>
                      <svg fill="none" className='w-full h-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 215 288">
                          <path d="M57.336 4.31h27.972v72.584l84.978-30.805v22.307L85.308 99.201v12.038l46.03-16.287 38.948-14.517v21.244c0 .945-.236 1.417-.708 1.417l-81.792 29.388c-.944.472-1.77.944-2.479 1.416v120.032c21.481-2.596 40.483-10.74 57.007-24.43 18.176-14.872 30.332-33.402 36.47-55.59 2.596-10.151 3.895-20.301 3.895-30.452h28.326c0 22.897-5.547 44.496-16.642 64.796-7.79 15.58-18.412 29.035-31.867 40.365-12.51 11.095-26.556 19.592-42.135 25.494-20.3 7.79-41.309 10.504-63.026 8.144V143.815l-4.603 1.77-48.508 17.35V140.63l53.111-19.12v-12.393c-2.596 1.18-6.078 2.597-10.445 4.249-4.367 1.652-7.14 2.596-8.32 2.832l-27.974 10.268-2.301.708c-1.535.472-2.892.826-4.072 1.062V105.93l53.111-18.766V4.31h.002Z" fill="currentColor"/>
                        </svg>
                     </div>
                        TRY
                    </div>
                    </MenuItem>
                  </Select>
            </FormControl>
            <input className='rounded-xl dark:bg-[#152336] dark:text-white text-black bg-white w-72 outline-emerald-400 font-graphik font-semibold text-right px-6 text-xl'
            placeholder='Swap Amount'
            type='number'
            value={fromAmount != 0 && fromAmount}
            onChange={e => {HandleAmountChange(Number(e.target.value))}}
            >
            </input>
            </div>
      </div>
          <div className='flex w-full align-middle justify-center my-3 text-black dark:text-white h-10'>
            <div className='h-full m-auto '>
              <IconContext.Provider value={{size:'100%'}}>
                <IoIosSwap />
              </IconContext.Provider>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <span className=' rounded-xl w-fit py-1 px-4 bg-blue-400 dark:bg-emerald-400 bg-opacity-25'>
              <span className='text-xs text-blue-800 dark:text-emerald-900 font-bold'>
                {'Slippage < 0.5%'}
              </span>
            </span>
            <div className='flex w-full gap-6'>
            <FormControl variant="filled" >
                  <Select
                    labelId="selectAccount"
                    value={toSwapType}
                    onChange={(e, i) => {HandleChange()}}
                    variant="outlined"
                    className="outline-none flex-1 dark:bg-[#152336] dark:text-white text-black bg-white rounded-xl"
                    inputProps={{
                      MenuProps: {
                          MenuListProps: {
                              sx: {
                                  backgroundColor: bgColor,
                                  color:'blue',
                              }
                          }
                      }
                  }}
                    >
                    <MenuItem key={'ETH'} value={'ETH'} className='w-full h-full'>
                    <div className='flex w-full h-auto text-xl justify-center items-center gap-4 font-bold dark:text-white text-black '>
                       <FaEthereum />
                        ETH
                    </div>
                    </MenuItem>
                    <MenuItem key={'TRY'} value={'TRY'} className='w-full h-full'>
                    <div className='flex w-full h-auto text-xl justify-center items-center gap-4 font-bold dark:text-white text-black '>
                     <div className='w-[20px] h-auto p-1'>
                      <svg fill="none" className='w-full h-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 215 288">
                          <path d="M57.336 4.31h27.972v72.584l84.978-30.805v22.307L85.308 99.201v12.038l46.03-16.287 38.948-14.517v21.244c0 .945-.236 1.417-.708 1.417l-81.792 29.388c-.944.472-1.77.944-2.479 1.416v120.032c21.481-2.596 40.483-10.74 57.007-24.43 18.176-14.872 30.332-33.402 36.47-55.59 2.596-10.151 3.895-20.301 3.895-30.452h28.326c0 22.897-5.547 44.496-16.642 64.796-7.79 15.58-18.412 29.035-31.867 40.365-12.51 11.095-26.556 19.592-42.135 25.494-20.3 7.79-41.309 10.504-63.026 8.144V143.815l-4.603 1.77-48.508 17.35V140.63l53.111-19.12v-12.393c-2.596 1.18-6.078 2.597-10.445 4.249-4.367 1.652-7.14 2.596-8.32 2.832l-27.974 10.268-2.301.708c-1.535.472-2.892.826-4.072 1.062V105.93l53.111-18.766V4.31h.002Z" fill="currentColor"/>
                        </svg>
                     </div>
                        TRY
                    </div>
                    </MenuItem>
                  </Select>
            </FormControl>
            <input disabled className='rounded-xl dark:bg-[#152336] dark:text-white text-black bg-white w-72 outline-emerald-400 font-graphik font-semibold text-right px-6 text-xl'
            placeholder='Swap Amount'
            value={toAmount}
            >
            </input>
            </div>
      </div>
          <div className='h-auto flex w-full align-middle items-center'>
            <div className='h-full w-auto mx-auto text-black dark:text-white font-semibold text-lg '>
              {toSwapType == 'TRY' ? 
                <>
                1 ETH ≈ {rateToTRY} TRY
                </>
                :  
                <>
                1 TRY ≈ {rateToETH} ETH
                </>
              }
            </div>
          </div>
          <div className='flex items-center w-full h-auto'>
            <button className='m-auto border-2 transition-all dark:border-[#152336] border-white hover:dark:border-black bg-gradient-to-b p-2 from-[#43cea2] to-[#185a9d] rounded-xl w-full
            active:scale-95' onClick={() => {handleSwapClick()}}>
              <div>
                <span className='text-2xl font-bold  text-white'>
                  {!swapLoading ? 'SWAP' : <Spinner size='small'/>}
                </span>

              </div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
