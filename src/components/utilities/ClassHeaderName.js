import React, {useState, useEffect} from 'react';

const ClassHeaderName = (props) => {
  const {id, jwt, nextText} = props;
  const [currentClass, setCurrentClass] = useState({});

  useEffect(()=> {
    fetch(`https://home-gradebook.herokuapp.com/view-class/${id}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer "+jwt
      }
    })
    .then(res=>res.json())
    .then(response=>setCurrentClass(response[0]))
    console.log("currentClass after set", currentClass);
  }, [setCurrentClass]);

  return(
    <h2>
      {currentClass.class_name} {nextText}
    </h2>
  )

}

export default ClassHeaderName