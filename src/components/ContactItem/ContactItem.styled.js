import styled from "styled-components";

export const Item = styled.li`
display: flex;
align-items: center;
justify-content: space-between;
width: 350px;
`

export const Button = styled.button`
margin-left: 10px;
cursor: pointer;
min-width: 50px;
height: 25px;
font-size: 15px;
border: 2px solid grey;
border-radius: 10px;
background-color: rgba(127, 127, 127, 0.7);
:hover {    
    font-weight: bold; 
    background: rgba(127, 127, 127, 0.7);    
}  
`