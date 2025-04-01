import { CommonApps } from "@/components/Common";
import { GhalbedovomNews } from "@/components/Ghlbedovom";
import { Notes } from "@/components/Notes";
import { OmegaNews } from "@/components/Omega";
import { Projects } from "@/components/Projects";
import { ProjectsCategories } from "@/components/ProjectsCategories";
import { RecentRepos } from "@/components/Recent";
import { Repos } from "@/components/Repos";
import { SSHTunnels } from "@/components/Ssh";
import { Todo } from "@/components/Todo";
import { Wrapper } from "@/components/Wrapper";
import { YouthNews } from "@/components/Youth";
import { Appear } from "@/elements/Animations";
import { Avatar, Container, Stack, Typography } from "@mui/material";
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <Wrapper>
      <Appear>
        <Container maxWidth="md" sx={{ my: 4 }}>
          <Stack direction="row" gap={4} alignItems="center">
            <Avatar
              src="/sharohil.jpg"
              alt="sharohil"
              sx={{
                width: 130,
                height: 130
              }}
            />
            <Stack>
              <Typography variant="h2">
                Hi, <Typography component="span" variant="h2" color="primary.main">Sharohil</Typography>
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Ready to Work Today? Happy Hacking!
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Appear>
      <RecentRepos />
      <Todo />
      <CommonApps />
      <ProjectsCategories />
      <SSHTunnels />
      <Notes />
      <Projects />
      <Repos />
      <YouthNews />
      <OmegaNews />
      <GhalbedovomNews />
      <Toaster position="top-center" duration={1e4} theme="dark" />
    </Wrapper>
  );
}
