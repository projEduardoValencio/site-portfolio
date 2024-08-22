import { IProject } from '../../models/interfaces/IProject';
import ProjectCard from '../ProjectCard/ProjectCard';
import { List } from './ProjectCardListStyle';

interface IProps {
  projects: IProject[];
}
const ProjectCardList = ({ projects }: IProps) => {
  return (
    <List className="project-card-list">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </List>
  );
};

export default ProjectCardList;
