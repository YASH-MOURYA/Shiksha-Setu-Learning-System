import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { authAPI, categoryAPI, courseAPI, healthAPI } from '../api/services';
import { Button, Card } from '../components/ui';

export const TestPage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results = {};

    // Test 1: Backend Health Check
    try {
      const healthResponse = await healthAPI.checkHealth();
      results.health = { status: 'success', data: healthResponse.data };
    } catch (error) {
      results.health = { status: 'error', error: error.message };
    }

    // Test 2: Categories API
    try {
      const categoriesResponse = await categoryAPI.getAllCategories();
      results.categories = { status: 'success', count: categoriesResponse.data?.categories?.length || 0 };
    } catch (error) {
      results.categories = { status: 'error', error: error.message };
    }

    // Test 3: Courses API
    try {
      const coursesResponse = await courseAPI.getAllCourses();
      results.courses = { status: 'success', count: coursesResponse.data?.courses?.length || 0 };
    } catch (error) {
      results.courses = { status: 'error', error: error.message };
    }

    // Test 4: Admin Login Test
    try {
      const loginResponse = await authAPI.login({
        emailId: 'admin@shiksha-setu.com',
        password: 'admin123'
      });
      results.adminLogin = { status: 'success', role: loginResponse.data?.user?.role };
    } catch (error) {
      results.adminLogin = { status: 'error', error: error.message };
    }

    setTestResults(results);
    setLoading(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">System Test Dashboard</h1>
        
        {/* Current User Info */}
        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Current User Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
              <p><strong>User:</strong> {user ? `${user.firstName} ${user.lastName}` : 'None'}</p>
              <p><strong>Role:</strong> {user?.role || 'None'}</p>
              <p><strong>Email:</strong> {user?.emailId || 'None'}</p>
            </div>
          </div>
        </Card>

        {/* Test Results */}
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">API Test Results</h2>
            <Button onClick={runTests} loading={loading}>
              Run Tests Again
            </Button>
          </div>
          
          <div className="space-y-4">
            {Object.entries(testResults).map(([testName, result]) => (
              <div key={testName} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium capitalize">{testName} Test</h3>
                  <span className={`px-2 py-1 rounded text-sm ${
                    result.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {result.status}
                  </span>
                </div>
                {result.status === 'success' ? (
                  <div className="text-sm text-gray-600">
                    {result.count !== undefined && <p>Count: {result.count}</p>}
                    {result.role && <p>Role: {result.role}</p>}
                    {result.data && <p>Response: OK</p>}
                  </div>
                ) : (
                  <div className="text-sm text-red-600">
                    Error: {result.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
            >
              Home
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/login'}
            >
              Login
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/categories'}
            >
              Categories
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/courses'}
            >
              Courses
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/dashboard/admin'}
            >
              Admin Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/dashboard/student'}
            >
              Student Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/dashboard/mentor'}
            >
              Mentor Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('http://localhost:8080/swagger-ui.html', '_blank')}
            >
              API Docs
            </Button>
          </div>
        </Card>

        {/* System Info */}
        <Card className="mt-8 p-6">
          <h2 className="text-xl font-semibold mb-4">System Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Frontend URL:</strong> http://localhost:5173</p>
              <p><strong>Backend URL:</strong> http://localhost:8080</p>
              <p><strong>API Docs:</strong> http://localhost:8080/swagger-ui.html</p>
            </div>
            <div>
              <p><strong>Test Credentials:</strong></p>
              <p>Admin: admin@shiksha-setu.com / admin123</p>
              <p>Mentor: mentor@shiksha-setu.com / mentor123</p>
              <p>Student: student@shiksha-setu.com / student123</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};