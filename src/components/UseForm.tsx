// 'use client'
// import { useState } from 'react'

// export const UseForm = (submitCallBack:any) => {
//   const [state, setState] = useState([])

//   const onChangeHandler = (e:any) => {
//     setState((state:any) => ({ ...state, [e.target.name]: e.target.value }))
//   }

//   const onSubmitHandler = (e:any) => {
//     e.preventDefault()
//     submitCallBack()
//   }
//   return [state, onChangeHandler, onSubmitHandler]
// }

// ===============
import { useState, ChangeEvent, FormEvent } from 'react';

export const useForm = (submitCallBack: () => void): [Record<string, string>, (e: ChangeEvent<HTMLInputElement>) => void, (e: FormEvent<HTMLFormElement>) => void] => {
  const [state, setState] = useState<Record<string, string>>({});

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitCallBack();
  };

  return [state, onChangeHandler, onSubmitHandler];
};
// ====================
// import { useState, ChangeEvent, FormEvent } from 'react';

// export const useForm = (
//   submitCallBack: () => void
// ): [
//   Record<string, string>,
//   (e: ChangeEvent<HTMLInputElement>) => void,
//   (e: FormEvent<HTMLFormElement>) => void,
//   () => void
// ] => {
//   const [state, setState] = useState<Record<string, string>>({});

//   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
//   };

//   const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     submitCallBack();
//   };

//   const resetForm = () => {
//     setState({});
//   };

//   return [state, onChangeHandler, onSubmitHandler, resetForm];
// };
