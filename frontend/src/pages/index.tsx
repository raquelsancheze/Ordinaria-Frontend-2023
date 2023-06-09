import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import {Event} from '@/types';
import Link from 'next/link';

const GET_EVENTS = gql`
  query GetEvents{
    events{
        id,
        title,
        description,
        date,
        startHour,
        endHour
    }
  }
`;

const CREATE_EVENT = gql`
  mutation CreateEvent($title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!){
    createEvent(title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour){
      title,
      description,
      date,
      startHour,
      endHour
    }
  }
`;

const REMOVE_EVENT = gql`
  mutation DeleteEvent($id: ID!){
    deleteEvent(id: $id){
      id
    }
  }
`;

const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: ID!, $title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!){
    updateEvent(id: $id, title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour){
      id,
      title,
      description,
      date,
      startHour,
      endHour
    }
  }
`;


export default function Events(){
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const {loading, error, data} = useQuery(GET_EVENTS);
  const [createEvent, {data: dataCreate}] = useMutation(CREATE_EVENT);
  const [deleteEvent, {data: dataDelete}] = useMutation(REMOVE_EVENT);
  const [updateEvent, {data: dataUpdate}] = useMutation(UPDATE_EVENT);
  let data2;

  if(loading){
    return(
      <p> La página se está cargando</p>
    )
  }
  if(error){
    <p> Se ha producido un error</p>
  }

  return(
    <>
      <h1> Lista de eventos disponibles </h1>
      <table>
        <thead>
          <tr>
            <th> Título  </th>
            <th> Descripción </th>
            <th> Fecha </th>
            <th> Hora de inicio </th>
            <th> Hora de fin </th>
            <th> Eliminar </th>
            <th> Modificar </th>
          </tr>
        </thead>
        <tbody>
          {data2 = data.events.sort}
          {data.events.map((event: Event) => (
            <tr key = {event.id}>
              <td> {event.title} </td>
              <td> {event.description} </td>
              <td> {event.date} </td>
              <td> {event.startHour} </td>
              <td> {event.endHour} </td>
              <td> 
                <button onClick = {() => {
                  deleteEvent({
                    variables: {
                      id: event.id
                    },
                    refetchQueries: [{
                      query: GET_EVENTS
                  }]
                  })
                }}>
                  Eliminar
                </button>
              </td>
              <td>
                <form>
                  <input type = "text" onChange = {(event) => {
                    setTitle(event.target.value)
                  }}/>
                  <input type = "text" onChange = {(event) => {
                    setDescription(event.target.value)
                  }}/>
                  <input type = "Date" value = {date} onChange = {(event) => {
                    setDate(event.target.value)
                  }}/>
                  <input type = "number" value = {startHour} onChange = {(event) => {
                    setStartHour(parseInt(event.target.value))
                  }}/>
                  <input type = "number" value = {endHour} onChange = {(event) => {
                    setEndHour(parseInt(event.target.value))
                  }}/>
                  <button onClick = {() => {
                    updateEvent({
                      variables: {
                        title,
                        description,
                        date,
                        startHour,
                        endHour,
                        id: event.id,
                      },
                      refetchQueries: [{
                        query: GET_EVENTS
                      }]
                    })
        }}> Modificar evento </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1> Crear evento </h1>
      <form>
        <input type = "text" onChange = {(event) => {
          setTitle(event.target.value)
        }}/>
        <input type = "text" onChange = {(event) => {
          setDescription(event.target.value)
        }}/>
        <input type = "Date" value = {date} onChange = {(event) => {
          setDate(event.target.value)
        }}/>
        <input type = "number" value = {startHour} onChange = {(event) => {
          setStartHour(parseInt(event.target.value))
        }}/>
        <input type = "number" value = {endHour} onChange = {(event) => {
          setEndHour(parseInt(event.target.value))
        }}/>
        <button onClick = {() => {
          createEvent({
            variables: {
              title,
              description,
              date,
              startHour,
              endHour
            },
            refetchQueries: [{
              query: GET_EVENTS
          }]
          })
        }}> Crear evento </button>
      </form>
    </>
  )
}