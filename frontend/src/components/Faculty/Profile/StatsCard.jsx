function StatsCard({ title, value, icon: Icon }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4">
            {Icon && (
                <div className="bg-blue-50 p-3 rounded-full">
                    <Icon className="text-blue-600" size={24} />
                </div>
            )}
            <div>
                <h3 className="text-sm font-medium text-gray-600">{title}</h3>
                <p className="text-xl font-bold text-blue-700">{value}</p>
            </div>
        </div>
    );
}

export default StatsCard;