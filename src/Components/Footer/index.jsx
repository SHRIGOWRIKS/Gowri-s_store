import {Typography} from 'antd'

const Footer = () =>{
    return (
      <div className='appFooter'>
        <Typography.Link href="https://www.google.com">Privacy Policy</Typography.Link>
        <Typography.Link href="https://www.google.com">Terms & Conditions</Typography.Link>
        <Typography.Link href="https://www.google.com">Return Policy</Typography.Link>
        <Typography.Link href="tel:+1234567890">+1234567890</Typography.Link>
      
      </div>
    )
  }

  export default Footer