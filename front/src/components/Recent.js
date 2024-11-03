import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import styled from 'styled-components';

const PostContainer = styled.div`
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: all 0.4s ease;
  padding: 20px;
  border-radius: 10px;
`;

const ActivityContainer = styled.div`
  width: 75%; /* Adjust this value as needed */
  margin: 20px 0;
  background: ${({ theme }) => theme.cardBackground}; /* Update background based on the theme */
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ActivityItem = styled.span`
  width: 100%;
  height: 64px; /* 16 * 4px */
  background: ${({ theme }) => theme.itemBackground}; /* Background for each item */
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  margin: 8px 0;
  display: flex;
  flex-direction: column;
`;

const ActivityContent = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 8px;
`;

function Recent() {
  const navigate = useNavigate();

  const request = [
    {
      id: 43128188132,
      name: "Violet Moore",
      img: "https://images.unsplash.com/photo-1630945386735-372fbe731e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 174119235182,
      name: "Beatrice Soto",
      img: "https://images.unsplash.com/photo-1630945386735-372fbe731e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 13242143,
      name: "Mittie Steele",
      img: "https://images.unsplash.com/photo-1630945386735-372fbe731e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 171544119,
      name: "Herbert McLaughlin",
      img: "https://images.unsplash.com/photo-1630945386735-372fbe731e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 55191,
      name: "Martha Parker",
      img: "https://images.unsplash.com/photo-1630945386735-372fbe731e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 922494,
      name: "Kyle Young",
      img: "https://images.unsplash.com/photo-1630945386735-372fbe731e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    },
  ];

  return (
    <PostContainer>
      <ActivityContainer>
        <span className="w-full font-bold text-xl flex items-start justify-start overflow-y-auto my-2">
          Recent activity
        </span>

        {/* Map starts here */}
        <div className="flex flex-col w-full">
          {request.map((item) => (
            <ActivityItem key={item.id}>
              <ActivityContent>
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-10 h-10 border-2 border-gray-300 mx-1 rounded-lg cursor-pointer"
                  onClick={() => navigate(`userProfile/${item.id}`)}
                />
                <h1
                  className="text-xs font-semibold cursor-pointer"
                  onClick={() => navigate(`userProfile/${item.id}`)}
                >
                  {item.name}
                </h1>
                <button className="bg-yellow-300 font-semibold text-xs text-gray-700 px-3 py-1 my-1 rounded-xl">
                  follow
                </button>
                <RxCross2 className="cursor-pointer" />
              </ActivityContent>
            </ActivityItem>
          ))}
        </div>
      </ActivityContainer>
    </PostContainer>
  );
}

export default Recent;
