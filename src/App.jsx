import FullPageChartPreview from './components/FullPageChartPreview';
import FullPagePreview from './components/FullPagePreview';
import FullPageProgressBar from './FullPageProgressbar';
import Home from './Home';
import { ChartPreviewContainer } from './providers/ChartPreviewProvider';
import { DataContainer } from './providers/DataProvider';
import { PathContainer } from './providers/PathProvider';
import { PreviewContainer } from './providers/PreviewProvider';
import { ProgressbarContainer } from './providers/ProgressbarContext';
import './App.css';

function App() {
  return (
    <ProgressbarContainer>
      <PathContainer>
        <DataContainer>
          <PreviewContainer>
            <ChartPreviewContainer>
              <Home />
              <FullPagePreview />
              <FullPageChartPreview />
              <FullPageProgressBar />
            </ChartPreviewContainer>
          </PreviewContainer>
        </DataContainer>
      </PathContainer>
    </ProgressbarContainer>
  );
}

export default App;
