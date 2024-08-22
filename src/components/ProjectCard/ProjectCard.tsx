import { IProject } from '../../models/interfaces/IProject';
import { Card } from '../styled-components/CardStyle';
import {
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
    <Card
      style={{ padding: '20px', flexDirection: 'column', alignItems: 'center' }}
    >
      <TitleMobile>{project.title}</TitleMobile>
      <ContentGrid>
        <img src={project.projectImageUrl} />

        <Title>{project.title}</Title>

        <Description>
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
    </Card>
  );
};

export default ProjectCard;