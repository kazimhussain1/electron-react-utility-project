import FullPagePreview from './components/FullPagePreview';
import FullPageProgressBar from './FullPageProgressbar';
import Home from './Home';
import { DataContainer } from './providers/DataProvider';
import { PreviewContainer } from './providers/PreviewProvider';
import { ProgressbarContainer } from './providers/ProgressbarContext';

function App() {
  return (
    <ProgressbarContainer>
      <DataContainer>
        <PreviewContainer>
          <Home />
          <FullPagePreview />
          <FullPageProgressBar />
        </PreviewContainer>
      </DataContainer>
    </ProgressbarContainer>
  );
}

export default App;
