import { ErrorBoundary } from './components/error-boundary';
import { ToastProvider } from './components/ui/toast';
import Navbar from './components/Navbar';
import NFTList from './components/NFTList';
import FilterBar from './components/FilterBar';

export default function Home() {
  return (
    <>
      <ToastProvider />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">NFT Pazar Yeri</h1>
          <ErrorBoundary>
            <FilterBar />
            <NFTList />
          </ErrorBoundary>
        </main>
      </div>
    </>
  );
}
