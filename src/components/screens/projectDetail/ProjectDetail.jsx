import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Loader from "../../ui/Loader";
import Modal from "../../ui/modal/Modal";
import styles from "./ProjectDetails.module.scss";

const defaultData = [
  {
    title: "Выполнить план по тз",
    created: "21.11.2024",
    completed: true,
  },
  {
    title: "Сделать реконструкцию функции",
    created: "17.11.2024",
    completed: false,
  },
  {
    title: "Добавить фильтры для проектов",
    created: "11.11.2024",
    completed: true,
  },
];

const ProjectDetail = () => {
  const [projects, setProjects] = useState(null);
  const [project, setProject] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValues, setEditValues] = useState({ title: "", created: "" });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const { projectIndex } = location.state || {};

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const projects =
      JSON.parse(localStorage.getItem("projects")) || defaultData;
    setProjects(projects);
    setProject(projects[projectIndex]);
    setIsLoading(false);
  }, [projectIndex]);

  const handleEditClick = (index, field, value) => {
    setEditingIndex(index);
    setEditValues({ ...editValues, [field]: value });
  };

  const handleInputChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (index) => {
    updateTask(index, editValues);
    setEditingIndex(null);
  };

  const toggleCompleted = (taskIndex) => {
    const updatedTasks = project.tasks.map((task, idx) =>
      idx === taskIndex ? { ...task, completed: !task.completed } : task
    );
    const updatedProject = { ...project, tasks: updatedTasks };
    updateProject(updatedProject);
  };

  const updateProject = (updatedProject) => {
    projects[projectIndex] = updatedProject;
    localStorage.setItem("projects", JSON.stringify(projects));
    setProject(updatedProject);
  };

  const addTask = (newTask) => {
    const updatedTasks = [...project.tasks, newTask];
    const updatedProject = { ...project, tasks: updatedTasks };
    updateProject(updatedProject);
  };

  const updateTask = (taskIndex, updatedTask) => {
    const updatedTasks = project.tasks.map((task, idx) =>
      idx === taskIndex ? { ...task, ...updatedTask } : task
    );
    const updatedProject = { ...project, tasks: updatedTasks };
    updateProject(updatedProject);
  };

  const deleteTask = (taskIndex) => {
    const updatedTasks = project.tasks.filter((_, idx) => idx !== taskIndex);
    const updatedProject = { ...project, tasks: updatedTasks };
    updateProject(updatedProject);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <h1>{project.title}</h1>
          <table>
            <thead>
              <tr>
                <th>Описание</th>
                <th>Дата создания</th>
                <th>Выполнено</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {project.tasks.map((task, index) => (
                <tr
                  key={task.title}
                  className={task.completed ? styles.strikethrough : ""}>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editValues.title}
                        className={styles.editTableInput}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        onBlur={() => handleBlur(index)}
                        autoFocus
                      />
                    ) : (
                      <span
                        onClick={() =>
                          handleEditClick(index, "title", task.title)
                        }>
                        {task.title}
                      </span>
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        className={styles.editTableInput}
                        value={editValues.created}
                        onChange={(e) =>
                          handleInputChange("created", e.target.value)
                        }
                        onBlur={() => handleBlur(index)}
                      />
                    ) : (
                      <span
                        onClick={() =>
                          handleEditClick(index, "created", task.created)
                        }>
                        {task.created}
                      </span>
                    )}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      style={{ cursor: "pointer" }}
                      checked={task.completed}
                      onChange={() => toggleCompleted(index)}
                    />
                  </td>
                  <td>
                    <MdDelete
                      style={{
                        color: "#44abb8",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteTask(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={openModal}>Добавить новую задачу</button>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            addTask={addTask}
            title="задачу"
            type="task"
          />
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
