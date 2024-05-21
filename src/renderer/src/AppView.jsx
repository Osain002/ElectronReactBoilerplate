import './App.css'
import ProjectView from './components/Project/ProjectView'
import TracksView from './components/Tracks/TracksView'
import TransportBar from './components/Transport/TransportBar'

function AppView() {

  return (
    <div className='bg-black-600 w-full h-full'>
      <TransportBar />
      <div className='flex flex-row w-full' style={{height: 'calc(100% - 2rem - 6px)'}}>
        <TracksView />
        <ProjectView />
      </div>
    </div>
  )
}

export default AppView
