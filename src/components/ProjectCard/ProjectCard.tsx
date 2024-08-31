import { IProject } from '../../models/interfaces/IProject';
import {
  ProjectContainerCard,
  Button,
  ButtonDiv,
  ContentGrid,
  Description,
  Tag,
  TagsDiv,
  Title,
  TitleMobile,
} from './ProjectCardStyle';

interface IProps {
  project: IProject;
}
const ProjectCard = ({ project }: IProps) => {
  return (
    <ProjectContainerCard>
      <TitleMobile>{project.title}</TitleMobile>
      <ContentGrid>
        <img src={project.projectImageUrl} />

        <Title className="padding-horizontal">{project.title}</Title>

        <Description className="padding-horizontal">
          <p dangerouslySetInnerHTML={{ __html: project.description }} />

          <TagsDiv>
            {project.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsDiv>
        </Description>

        <ButtonDiv>
          {
            project.applicationAppUrl && (
              <Button>Go To App</Button>
            )
          }
          <Button fillButton>Source Code</Button>
        </ButtonDiv>
      </ContentGrid>
    </ProjectContainerCard>
  );
};

export default ProjectCard;
