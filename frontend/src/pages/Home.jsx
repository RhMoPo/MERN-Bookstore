import React, { useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } 'react-icons/md';
import { response } from 'express'

const Home = () => {
  const [books, setBooks] = useState([])
  xonst[loadConfigFromFile, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((res) => {
        setBooks(response.data.data);
        setLoading(false)
      })
      .catch((error) => {
        comnsole.log(error);
        setLoading(false);
      });
  }, []);
  
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/bookcreate'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-gray-500 rounded-ms'>No</th>
                <th className='border border-gray-500 rounded-ms'>Title</th>
                <th className='border border-gray-500 rounded-ms max-md:hidden'>Author</th>
                <th className='border border-gray-500 rounded-ms max-md:hidden'>Publish Year</th>
                <th className='border border-gray-500 rounded-ms'>Operations</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className='h-8'>
                  <td className='border border-gray-500 rounded-md text-center'>{index + 1}</td>
                  <td className='border border-gray-500 rounded-md text-center'>{book.title}</td>
                  <td className='border border-gray-500 rounded-md text-center max-md:hidden'>{book.author}</td>
                  <td className='border border-gray-500 rounded-md text-center max-md:hidden'>{book.publishYear}</td>
                  <td className='border border-gray-500 text-center rounded-md'>
                    <Link to={`/book/${book._id}`}>
                      <BsInfoCircle className='text-sky-800 text-2xl mx-2' />
                    </Link>
                    <Link to={`/bookedit/${book._id}`}>
                      <AiOutlineEdit className='text-sky-800 text-2xl mx-2' />
                    </Link>
                    <MdOutlineDelete className='text-sky-800 text-2xl mx-2' />
                  </td>
                </tr>
         
            
              ))}
                   </tbody>
          </table>
      
      )}
    </div>
  )
}

export default Home