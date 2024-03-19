import React from 'react';
import { useParams } from 'react-router-dom';

export default function UserTests() {
  const { id } = useParams();

  return <div>UserTests</div>;
}
