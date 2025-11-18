'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '../providers/ThemeProvider';

export default function Page() {
  const { theme, setTheme } = useTheme();
  useEffect(() => setTheme('light'), []);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      tasks: [
        { id: 1, text: 'Design mockups', completed: true },
        { id: 2, text: 'Frontend development', completed: false },
        { id: 3, text: 'Backend integration', completed: false },
      ],
    },
  ]);
  const [activeProject, setActiveProject] = useState(1);
  const [newProjectName, setNewProjectName] = useState('');
  const [newTaskText, setNewTaskText] = useState('');

  const addProject = () => {
    if (newProjectName.trim()) {
      const newProject = {
        id: Date.now(),
        name: newProjectName,
        tasks: [],
      };
      setProjects([...projects, newProject]);
      setActiveProject(newProject.id);
      setNewProjectName('');
    }
  };

  const deleteProject = (id: number) => {
    const filtered = projects.filter((p) => p.id !== id);
    setProjects(filtered);
    if (activeProject === id && filtered.length > 0) {
      setActiveProject(filtered[0].id);
    }
  };

  const addTask = () => {
    if (newTaskText.trim()) {
      setProjects(
        projects.map((p) =>
          p.id === activeProject
            ? {
                ...p,
                tasks: [
                  ...p.tasks,
                  { id: Date.now(), text: newTaskText, completed: false },
                ],
              }
            : p,
        ),
      );
      setNewTaskText('');
    }
  };

  const toggleTask = (taskId: number) => {
    setProjects(
      projects.map((p) =>
        p.id === activeProject
          ? {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id === taskId ? { ...t, completed: !t.completed } : t,
              ),
            }
          : p,
      ),
    );
  };

  const deleteTask = (taskId: number) => {
    setProjects(
      projects.map((p) =>
        p.id === activeProject
          ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
          : p,
      ),
    );
  };

  const currentProject = projects.find((p) => p.id === activeProject);
  const progress =
    currentProject && currentProject.tasks.length > 0
      ? Math.round(
          (currentProject.tasks.filter((t) => t.completed).length /
            currentProject.tasks.length) *
            100,
        )
      : 0;

  return (
    <div className='min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 p-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2'>
            Project Progress Checklist
          </h1>
          <p className='text-gray-600'>
            Organize and track your project milestones
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Projects Sidebar */}
          <div className='lg:col-span-1 '>
            <div className='card bg-white shadow-xl'>
              <div className='card-body'>
                <h2 className='card-title text-2xl mb-4'>📁 Projects</h2>

                <div className='flex gap-2 mb-4'>
                  <input
                    type='text'
                    placeholder='New project name...'
                    className='input input-bordered flex-1 input-md text-zinc-800 bg-zinc-200'
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addProject()}
                  />
                  <button
                    className='btn btn-primary btn-md btn-square'
                    onClick={addProject}
                  >
                    +
                  </button>
                </div>

                <div className='space-y-2 max-h-96 overflow-y-auto'>
                  {projects.map((project) => {
                    const projectProgress =
                      project.tasks.length > 0
                        ? Math.round(
                            (project.tasks.filter((t) => t.completed).length /
                              project.tasks.length) *
                              100,
                          )
                        : 0;

                    return (
                      <div
                        key={project.id}
                        className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                          activeProject === project.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        onClick={() => setActiveProject(project.id)}
                      >
                        <div className='flex justify-between items-start mb-2'>
                          <span className='font-semibold text-sm'>
                            {project.name}
                          </span>
                          <button
                            className='btn btn-ghost btn-xs text-error'
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteProject(project.id);
                            }}
                          >
                            ×
                          </button>
                        </div>
                        <div className='flex items-center gap-2'>
                          <progress
                            className='progress progress-primary w-full h-2'
                            value={projectProgress}
                            max='100'
                          ></progress>
                          <span className='text-xs font-medium text-gray-600'>
                            {projectProgress}%
                          </span>
                        </div>
                        <p className='text-xs text-gray-500 mt-1'>
                          {project.tasks.filter((t) => t.completed).length} of{' '}
                          {project.tasks.length} tasks
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Tasks Panel */}
          <div className='lg:col-span-2'>
            {currentProject ? (
              <div className='card bg-white shadow-xl'>
                <div className='card-body'>
                  <div className='flex justify-between items-start mb-6'>
                    <div>
                      <h2 className='card-title text-3xl'>
                        {currentProject.name}
                      </h2>
                      <p className='text-sm text-gray-500 mt-1'>
                        {currentProject.tasks.filter((t) => t.completed).length}{' '}
                        completed,{' '}
                        {
                          currentProject.tasks.filter((t) => !t.completed)
                            .length
                        }{' '}
                        remaining
                      </p>
                    </div>
                    <div
                      className='radial-progress text-purple-600'
                      style={
                        {
                          '--value': progress,
                          '--size': '4rem',
                          '--thickness': '4px',
                        } as React.CSSProperties
                      }
                    >
                      {progress}%
                    </div>
                  </div>

                  <div className='flex gap-2 mb-6'>
                    <input
                      type='text'
                      placeholder='Add a new task...'
                      className='input input-bordered flex-1 bg-zinc-200 text-zinc-800'
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    />
                    <button className='btn btn-primary' onClick={addTask}>
                      + Add Task
                    </button>
                  </div>

                  <div className='space-y-3 max-h-96 overflow-y-auto'>
                    {currentProject.tasks.length === 0 ? (
                      <div className='text-center py-12 text-gray-400'>
                        <div className='text-6xl mb-3'>○</div>
                        <p>No tasks yet. Add your first task to get started!</p>
                      </div>
                    ) : (
                      currentProject.tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                            task.completed
                              ? 'bg-green-50 border-green-200'
                              : 'bg-white border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <button
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              task.completed
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 hover:border-purple-500'
                            }`}
                            onClick={() => toggleTask(task.id)}
                          >
                            {task.completed && '✓'}
                          </button>
                          <span
                            className={`flex-1 ${
                              task.completed
                                ? 'line-through text-gray-500'
                                : 'text-gray-800'
                            }`}
                          >
                            {task.text}
                          </span>
                          <button
                            className='btn btn-ghost btn-sm text-error'
                            onClick={() => deleteTask(task.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className='card bg-white shadow-xl'>
                <div className='card-body items-center justify-center py-20'>
                  <div className='text-8xl text-gray-300 mb-4'>📁</div>
                  <h3 className='text-2xl font-bold text-gray-400'>
                    No project selected
                  </h3>
                  <p className='text-gray-500'>
                    Create a new project to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
