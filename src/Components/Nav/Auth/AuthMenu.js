import React, { useState } from 'react'
import "./Auth.css"
function AuthMenu(props) {

    const [createNew, setCreateNew] = useState()

  return (
    <div className='authWindow'>
        <h1>{createNew ? "Create Account" : "Login"}</h1>
        <div className='closeButton' onClick={()=>props.setShowAuthMenu(false)}>X</div>
        <div>
          <input placeholder='username'></input>
        </div>
        <div>
          <input placeholder='pass' type={"password"}></input>
        </div>
        {createNew && <input placeholder='pass confirmation'></input>}
        <div>
          <button>{
            createNew ?
            "Create Account"
            :
            "Log In"
          }</button> 
        </div>
        <div className='loginBottomText'>
            {
                createNew ?
                <div>
                    Already a member? 
                    <a onClick={()=>setCreateNew(false)}>
                        Sign In
                    </a>
                </div>
                :
                <div>
                    New Here? 
                    <a onClick={()=>setCreateNew(true)}>
                        Sign Up now
                    </a>

                </div>                
            }
        </div>
    </div>
  )
}

export default AuthMenu