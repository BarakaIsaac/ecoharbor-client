import React from 'react'


function myassets() {
  const form = useForm();
  const { register, control } = form;
  return (
      <>
        {/* <p>My Assets</p> */}
        <form>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' {...register('username')} />

          <label htmlFor='username'>Email</label>
          <input type='email' id='email' {...register('email')} />

          <button>Submit</button>


        </form>
        <DevTool control={control} />
      </>
      
      
   
  )
}

export default myassets
