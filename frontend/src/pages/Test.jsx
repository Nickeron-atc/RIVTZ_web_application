import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import MyButton from '../components/UI/Button/MyButton.jsx'
import MyInput from '../components/UI/input/MyInput.jsx'
import MySelect from '../components/UI/select/MySelect.jsx'

function Test(inputValue) {
    // Variables

    const navigate = useNavigate()

    if (localStorage.getItem('isAuthenticated') != 'true')
      navigate('/login');

    const onButtonIsPressed = async () => {
        /*
        const credentials = {
            auth_token: localStorage.getItem('auth_token'),
            name: name.trim(),
            gender: gender,
            birthdate: birthdate,
            kredit_type: kredit_type,
            email: email,
            request: request
        };*/

        try {
            const response = await fetch("http://localhost:5000/api/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify("")
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);

            if (data['status'] != 'error')
            {
              // Get answer
            }
            else
              navigate('/login');
            

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }

        return (<div></div>);
    };

    return (
        <div>
            <div className="Table_head" style={{'display': 'flex', 'flex-direction': 'row', 'align-items': 'start', 'backgroundColor': "rgba(0, 128, 128, 0.5)", 'color': "rgba(0, 0, 0, 0.7)" }}>
                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                        <div>txt1</div>
                        <MyInput/>
                    </div>
                </div>

                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                        <div>txt1</div>
                        <MyInput/>
                    </div>
                </div>

                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                        <div>txt1</div>
                        <MyInput/>
                    </div>
                </div>

                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                        <div>txt1</div>
                        <MyInput/>
                    </div>
                </div>
            </div>
            
            <div style={{'background':'rgba(200, 10, 10, 0.5)'}}>
            <div className="Table_content" style={{'margin':'10px','display': 'flex', 'flex-direction': 'row', 'align-items': 'start', 'backgroundColor': "rgba(0, 128, 128, 0.5)", 'color': "rgba(0, 0, 0, 0.7)" }}>
                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px', 'width':'200px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                        <div>txt1</div>
                    </div>
                </div>
    
                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'width':'200px'}}>
                        <div>txt1</div>
                    </div>
                </div>
    
                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'width':'200px'}}>
                        <div>txt1</div>
                    </div>
                </div>
    
                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'width':'200px'}}>
                        <div>txt1</div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Test;


/*
<div style={{ 'width': '800px', 'height': 'auto'}} >
            <MySelect 
                options={
                    [
                        {value: "value1", name: "name1"},
                        {value: "value2", name: "name2"}
                    ]
                }
                defaultValue={"mama"}
                value={"delete me"}/>
        </div>
*/