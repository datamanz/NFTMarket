import CreateNFTForm from '../components/CreateNFTForm';
import Navbar from '../components/Navbar';

export default function CreateNFTPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <CreateNFTForm />
      </main>
    </div>
  );
}
