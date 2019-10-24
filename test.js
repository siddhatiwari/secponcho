// import React from 'react';
// import { TouchableOpacity } from 'react-native';

const Button = () => {
  return (
    <TouchableOpacity>
      <Text>Hello</Text>
    </TouchableOpacity>
  )
}

<Button />


const Toggle = () => {
  const [toggled, setToggled] = useState(false);
  return (
    <TouchableOpacity onPress={() => setToggled(!toggled)}>
      <Text>{toggled ? 'On!' : 'Off :('}</Text>
    </TouchableOpacity>
  )
}



// export default Toggle;



// Functions
// Two ways to make them

function f(x) {
  console.log(x);
}

const f = x => {
  console.log(x);
}

// JSX
// Basically html

{/* <Text>Hello World</Text> */}
{/* <TouchableOpacity onPress={() => alert("Hello World")} /> */}
