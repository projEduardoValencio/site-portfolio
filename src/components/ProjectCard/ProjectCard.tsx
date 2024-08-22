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
    <ProjectContainerCard
      style={{
        padding: '30px 40px',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
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
          <Button>Go To App</Button>
          <Button fill>Source Code</Button>
        </ButtonDiv>
      </ContentGrid>
    </ProjectContainerCard>
  );
};

export default ProjectCard;
