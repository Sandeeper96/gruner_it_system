'use client'

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8 bg-blue-50 min-h-screen dashboard-scren-main-container">
      {/* <h1 style={{color:"#ee7100"}} className="text-4xl font-bold text-center">GRUNER INDIA IT SYSTEM</h1>
      <p style={{color:"#ee7100"}} className="text-center text-lg">Employee Inventory Management System</p> */}
<h1 style={{color:"#ee7100", fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}  className="text-center">
  GRUNER INDIA IT SYSTEM
</h1>
<p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}  className="text-center">
  Empowering Your Inventory Management System
</p>

{/* <div style={{textAlign:"center"}}   className="text-center">
  <video
  src={'../../it-team/it-video.mp4'}
    autoPlay
    controls
    muted
    loop
    playsInline
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }}
      />
</div> */}



      {/* Navigation Buttons */}
      {/* <div className="flex justify-center gap-4">
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Home</button>
        <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">About</button>
        <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">Inventory</button>
        <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">Employees</button>
      </div> */}

      {/* Main Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title="Inventory Management"
          description="Track and manage all company items including laptops, mice, desktops, and more."
          buttonText="View Inventory"
        />
        <Card
          title="Employee Management"
          description="Manage employee information and track item assignments."
          buttonText="View Employees"
        />
        <Card
          title="Quick Stats"
          description="Overview of your inventory system"
          content={
            <ul className="mt-4 space-y-1 text-sm">
              <li>Total Items: <strong>156</strong></li>
              <li>Assigned Items: <strong>89</strong></li>
              <li>Employees: <strong>42</strong></li>
            </ul>
          }
        />
      </div> */}

      {/* Features Section */}
      {/* <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-4">System Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Feature title="Item Tracking" description="Track laptops, mice, desktops, and other equipment" />
          <Feature title="Employee Records" description="Maintain detailed employee information" />
          <Feature title="Serial Numbers" description="Track unique serial numbers for all items" />
          <Feature title="Brand Management" description="Organize items by brand and company" />
        </div>
      </div> */}
    
    </div>
  )
}

function Card({ title, description, buttonText, content }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      {content ? (
        content
      ) : (
        <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800">{buttonText}</button>
      )}
    </div>
  )
}

function Feature({ title, description }) {
  return (
    <div className="text-center p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
